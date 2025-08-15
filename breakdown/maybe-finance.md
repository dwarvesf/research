---
title: Maybe Finance breakdown
short_title: Maybe finance
description: null
date: 2025-08-14
authors:
  - huymaius
tags:
  - breakdown
  - finance
  - ruby on rail
---

## Overview

Maybe is an open-source personal finance application originally developed as a commercial product with over $1 million in development investment. After the commercial venture ended in 2023, the codebase was open-sourced to enable individuals to manage their finances using a sophisticated, feature-rich platform.

![Demo](./assets/maybe-illu.gif)

**Key components:**
- **Multi-tenant family-based architecture**: Central organizational structure around families
- **Multi-currency support**: Powered by Synth Finance API for exchange rates
- **Financial institution integration**: Plaid API for US/EU bank connections
- **Manual data management**: CSV imports and manual entry capabilities
- **Investment tracking**: Securities data and portfolio management
- **Self-hosting capabilities**: Complete Docker-based deployment stack

## How it works

### Application Infrastructure
Maybe implements a Rails 7.2 application with specialized subsystems for financial data management, external integrations, and multi-tenant organization. The architecture is built around the Family model as the central aggregate root and tenant boundary.

```mermaid
graph TB
    %% External Integrations (top)
    subgraph "External Integrations"
        PlaidAPI["Plaid API<br/>Bank Connections"]
        SynthAPI["Synth Finance<br/>Security Data"]
    end

    %% Background Processing (top right)
    subgraph "Background Processing"
        SidekiqWorkers["Sidekiq Workers<br/>Background Jobs"]
        SyncSystem["Sync System<br/>Data Reconciliation"]
        CSVImport["CSV Import<br/>Data Processing"]
    end

    %% User Interface (right)
    subgraph "User Interface"
        AppLayout["Application Layout<br/>Navigation & Sidebar"]
        Dashboard["Financial Dashboard<br/>Net Worth Charts"]
        TransactionForms["Transaction Forms<br/>Account Management"]
    end

    %% Authentication (left middle)
    UserAuth["User<br/>Authentication"]

    %% Core Domain Models (center)
    subgraph "Core Domain Models"
        Family["Family<br/>Root Aggregate"]
        Account["Account<br/>Polymorphic"]
        TransactionEntry["Transaction/Entry<br/>Financial Events"]
    end

    %% Data Flow Connections
    PlaidAPI --> SyncSystem
    SynthAPI --> SyncSystem
    
    UserAuth --> Family
    
    Family --> Account
    Family --> TransactionEntry
    Account --> TransactionEntry
    
    SyncSystem --> Account
    CSVImport --> TransactionEntry
    SidekiqWorkers --> SyncSystem
    SidekiqWorkers --> CSVImport
    
    UserAuth --> AppLayout
    AppLayout --> Dashboard
    AppLayout --> TransactionForms
    
    Family --> Dashboard
    Account --> Dashboard
    TransactionEntry --> TransactionForms
```


### Core Data Model

The data model implements a multi-tenant architecture centered around the Family model. Each family serves as an isolated tenant with complete ownership of their financial data, users, and configurations.

```mermaid
flowchart TD
    Family["Family (Tenant Root)"]
    
    Family --> Users
    Family --> Categories
    Family --> Tags
    Family --> FamilyMerchants
    Family --> Rules
    Family --> Budgets
    Family --> Imports
    Family --> InvitationsReceived["Invitations (received)"]
    Family --> PlaidItems
    
    Users --> Sessions
    Users --> InvitationsInviter["Invitations (as inviter)"]

    Family --> Accounts
    Accounts --> Entries
    Accounts --> Balances
    Accounts --> Holdings

    PlaidItems --> PlaidAccounts
    PlaidAccounts --> Accounts
```

#### Primary Models

**Family (Aggregate Root)**
- Central tenant boundary for data isolation
- Owns all financial data (accounts, transactions, categories)
- Stores default currency and family-wide configuration
- Enables shared access for multiple family members

**User (Access Control)**
- Belongs to family, inherits access to all family data
- Supports multiple users per family (spouses, advisors)
- No direct data ownership - all data belongs to family unit

**Account (Financial Foundation)**
- Uses Rails delegated types for account specialization
- Supports checking, savings, credit, investment, loan, property accounts
- Polymorphic design enables type-specific behavior while maintaining unified interface
- Links to financial institutions via Plaid integration

**Entry (Financial Events)**
- Base class for all financial events using polymorphic relationships
- Handles transactions, valuations, and trades through "entryable" pattern
- Provides consistent chronological ordering and amount handling
- Maintains family-level aggregation capabilities

#### Specialized Models

**Transaction**
- Core personal finance activity (purchases, deposits, transfers)
- Automatic transfer detection prevents double-counting in budgets
- Supports categorization and tagging for organization
- Handles complex transfer scenarios between family accounts

**Investment System**
- Security: Investable assets with market data
- Holding: Current positions in investment accounts
- Trade: Buy/sell transactions with quantity, price, fees
- Enables portfolio valuation and performance tracking

**Category & Tag System**
- Categories: Hierarchical organization for budgeting
- Tags: Flexible, non-hierarchical cross-cutting analysis
- Supports both income and expense classification

**Import System**
- Handles CSV imports, Mint exports, other financial software
- Type-specific models (TransactionImport, TradeImport, AccountImport)
- Intelligent format detection and validation
- Robust data migration capabilities

**Institution Integration**
- Institution: Financial institution metadata
- PlaidItem/PlaidAccount: API integration management
- Supports both automated syncing and manual entry
- Fallback mechanisms for connection failures

**Multi-Currency Support**
- Consistent currency storage at account level
- Family-level default currency for aggregation
- Money objects handle conversion and arithmetic
- Exchange rate integration for accurate cross-currency calculations

## Technical Challenges
#### Caching Performance Optimization

**Multi-Layered Caching Architecture**
Maybe implements a comprehensive multi-layered caching strategy to handle the performance demands of financial data processing. The core caching system is built around the Family model's cache key management, which creates cache keys that automatically invalidate when account data changes, using sync timestamps and account update times as invalidation triggers. The system also maintains separate cache versioning for entry-related calculations, ensuring that different types of financial data have appropriate invalidation strategies.

```mermaid
flowchart TD
    %% User Entry Points
    A[User Request] --> B[Cache Strategy Decision]

    %% Three Cache Layers
    B --> C[Layer 1: HTTP ETag Cache]
    B --> D[Layer 2: Rails Cache]
    B --> E[Layer 3: Memoization]

    %% Cache Hit/Miss Flow
    C -->|Hit| F[Return 304 Not Modified]
    C -->|Miss| D
    D -->|Hit| G[Return Cached Data]
    D -->|Miss| H[Generate Cache Key]
    E -->|Hit| I[Return Memoized Data]
    E -->|Miss| J[Execute Query & Calculate]

    %% Cache Key Generation
    H --> K[Family ID + Key Name + Timestamps]
    K --> L[Store in Rails Cache]

    %% Data Processing
    J --> M[Process Financial Data]
    M --> N[Store in All Cache Layers]

    %% Storage Backends
    subgraph "Storage"
        O[Client Browser ETags]
        P[Rails Memory/Redis Cache]
        Q[Ruby Instance Variables]
    end

    %% Invalidation
    subgraph "Cache Invalidation"
        R[Account Updates]
        S[Entry Updates]
        T[Sync Completion]
    end

    %% Connections
    F --> O
    G --> P
    L --> P
    I --> Q
    N --> O
    N --> P
    N --> Q

    R --> U[Invalidate Caches]
    S --> U
    T --> U
    U --> H
```

**Family-Level Cache Key Management**
The caching mechanism uses intelligent cache management where the Family model serves as the central cache coordinator. Cache keys are generated using composite timestamps that include latest sync completion times and account update timestamps. This dual-cache approach ensures that account-related changes trigger appropriate cache invalidation while maintaining performance for unchanged data. The system creates hierarchical cache keys that cascade invalidation from family level down to individual account calculations.

**Sparkline Caching Strategy**
The sparkline system implements sophisticated multi-layered caching for chart data through the AccountableSparklinesController, which uses HTTP ETags for client-side caching combined with Rails.cache for server-side storage. Individual accounts implement their own sparkline caching through the Account::Chartable module, creating a hierarchical caching system where both family-level and account-level sparklines are cached independently with 24-hour expiration times. This approach reduces computational overhead for frequently accessed dashboard elements while ensuring data freshness.

**Environment-Specific Cache Configuration**
The development environment provides configurable caching for testing purposes through `rails dev:cache` command, using memory store with 2-day cache headers when enabled, or null store to prevent caching during development. Production environments implement always-on caching with Redis integration, including eager loading for better memory efficiency and improved response times. This environment-specific approach allows developers to test both cached and non-cached scenarios while ensuring production performance.

**Income Statement Cache Optimization**
The income statement system demonstrates sophisticated query-level caching with multiple cache layers, caching family stats, category stats, and totals queries using SQL hash-based cache keys combined with the family's entries cache version for automatic invalidation. This approach ensures that expensive financial calculations are cached appropriately while maintaining accuracy when underlying data changes.

**Cache Invalidation Challenges and Solutions**
Financial data changes frequently through syncs, user updates, and external data imports, making cache invalidation extremely complex. The system addresses this through a multi-trigger invalidation strategy using different cache keys for different data types. Account-related caches invalidate when accounts change, while entry-related caches use separate versioning. The invalidation strategy uses sync-based triggers with latest_sync_completed_at timestamps, account update invalidation using accounts.maximum(:updated_at), entry-based invalidation using entries.maximum(:updated_at), and SQL hash invalidation using MD5 hashes of SQL queries for query-specific caches.

**Balance Calculation Cache Coordination**
Balance calculations involve multiple data sources including entries, holdings, and exchange rates that must be coordinated for cache consistency. The balance calculator uses a sync cache system to coordinate entry flows and holdings calculations, ensuring consistent data access patterns across balance calculations. This prevents cache inconsistencies that could lead to incorrect financial displays while maintaining computational efficiency.

**Administrative Cache Management**
For self-hosted instances, the system provides administrative cache clearing functionality that removes exchange rates, security prices, holdings, and balances. This capability is only available to family admins in self-hosted mode, allowing users to resolve cache-related issues without requiring developer intervention. The cache clearing process is comprehensive, addressing all major cached data types that could become problematic in self-hosted environments.

**Performance Monitoring Integration**
The system includes Public Skylight dashboard integration for monitoring caching effectiveness and identifying performance bottlenecks. This provides transparency into which caching strategies are working effectively and helps identify areas needing optimization. The monitoring integration allows the development team to continuously refine caching strategies based on real-world usage patterns and performance data.

### Multi-Currency Complexity

**Challenge**: Supporting global users requires handling multiple currencies within the same family's financial data. Exchange rate fluctuations, currency conversion accuracy, and meaningful aggregation across currencies present significant technical challenges.

**Solution**: The architecture stores both amount and currency for every financial entry, using the Synth Finance API for real-time exchange rates. The family's default currency serves as the base for aggregation, while individual accounts maintain their native currencies. Money objects handle conversion mathematics with proper precision.

```mermaid
graph TD
    subgraph "Maybe Multi-Currency System"
        A["Family Currency Setup"]
        A --> B["Currency Detection"]
        A --> C["Exchange Rate System"]
        A --> D["Currency Conversion"]
    end

    subgraph "Data Requirements"
        B --> E{"Need Provider?"}
        E -->|Has Trades/Multi-Currency| F["Synth Finance API"]
        E -->|Single Currency Only| G["Local Only"]
    end

    subgraph "Exchange Rate Processing"
        C --> H["Database Storage"]
        C --> I["LOCF Gap Filling"]
        C --> J["Cache Strategy"]
    end

    subgraph "Currency Conversion"
        D --> K["Money Class"]
        D --> L["Balance Calculation"]
        D --> M["Transfer Matching"]
    end

    subgraph "Complex Operations"
        N["Cross-Currency Transfers"]
        N --> O["6-Way SQL JOIN"]
        N --> P["5% Tolerance"]
        Q["Multi-Currency Charts"]
        Q --> R["Family Base Currency"]
        Q --> S["Time Series LOCF"]
    end

    %% Data Flow Connections
    F --> H
    K --> H
    L --> R
    M --> O
    I --> S
```

#### Exchange Rate Caching Strategy

**Multi-Layer Caching Architecture**
Maybe implements a sophisticated caching strategy to minimize external API calls while ensuring rate accuracy. The system employs a database-first lookup approach where exchange rates are stored locally in a dedicated ExchangeRate model. When a rate is needed, the system first checks the local cache before making external provider requests to Synth Finance API.

**Cache Optimization Logic**
The caching mechanism uses intelligent cache management where rates are stored with currency pair and date as composite keys, enabling fast lookups for historical data. The system can optionally cache newly fetched rates for future use, reducing redundant API calls for commonly requested currency pairs. Cache invalidation ensures stale rates don't affect calculations while maintaining performance benefits.

#### LOCF (Last Observation Carried Forward) Algorithm

**Gap-Filling Strategy**
LOCF represents the core algorithm for handling missing exchange rate data across weekends, holidays, and provider outages. When the system encounters missing rate data for a specific date, it automatically carries forward the most recent available rate from a previous date.

**Implementation Process**
The LOCF algorithm iterates through each date in a target range, checking for existing rates in both database cache and external providers. When no rate is available from either source, the algorithm uses the previous rate value to fill the gap. This previous rate value is continuously updated as the algorithm progresses through the date range, ensuring continuous data coverage.

**Application Areas**
LOCF is implemented across multiple system components. In exchange rate imports, it ensures continuous rate coverage when external providers don't return weekend or holiday data. For security price data, the same strategy fills gaps in stock and investment prices when markets are closed. In balance chart calculations, LOCF operates at the SQL level using lateral joins to find the most recent balance and exchange rate on or before each chart date.

**Data Consistency Benefits**
The LOCF strategy prevents broken financial charts and ensures consistent calculations even when external data sources have gaps. This approach is particularly crucial for time series analysis where continuous data is essential for accurate trend visualization and portfolio valuation. The algorithm maintains historical accuracy while providing seamless user experience across different market conditions and data provider limitations.

## Clever Tricks and Tips

### Polymorphic Account Architecture with Delegated Types

The system uses Rails' delegated types pattern to implement account specialization while maintaining a unified interface. This approach enables account-type-specific behavior (credit limits for credit cards, interest rates for loans) while preserving common operations like balance calculations and transaction aggregation.

```
def balance_type
    case accountable_type
    when "Depository", "CreditCard"
      :cash
    when "Property", "Vehicle", "OtherAsset", "Loan", "OtherLiability"
      :non_cash
    when "Investment", "Crypto"
      :investment
    else
      raise "Unknown account type: #{accountable_type}"
    end
  end
```

### Transfer Auto-Detection Algorithm

Maybe implements smart transfer detection that finds matching amounts and dates across family accounts. The algorithm handles processing delays and amount differences while avoiding mistakes that could wrongly classify regular transactions as transfers.

```ruby
module Family::AutoTransferMatchable
  def transfer_match_candidates
    Entry.select([
      "inflow_candidates.entryable_id as inflow_transaction_id",
      "outflow_candidates.entryable_id as outflow_transaction_id",
      "ABS(inflow_candidates.date - outflow_candidates.date) as date_diff"
    ]).from("entries inflow_candidates")
      .joins("
        JOIN entries outflow_candidates ON (
          inflow_candidates.amount < 0 AND
          outflow_candidates.amount > 0 AND
          inflow_candidates.account_id <> outflow_candidates.account_id AND
          inflow_candidates.date BETWEEN outflow_candidates.date - 4 AND outflow_candidates.date + 4
        )
      ").joins("
        LEFT JOIN transfers existing_transfers ON (
          existing_transfers.inflow_transaction_id = inflow_candidates.entryable_id OR
          existing_transfers.outflow_transaction_id = outflow_candidates.entryable_id
        )
      ")
      .joins("LEFT JOIN rejected_transfers ON (
        rejected_transfers.inflow_transaction_id = inflow_candidates.entryable_id AND
        rejected_transfers.outflow_transaction_id = outflow_candidates.entryable_id
      )")
      .joins("LEFT JOIN exchange_rates ON (
        exchange_rates.date = outflow_candidates.date AND
        exchange_rates.from_currency = outflow_candidates.currency AND
        exchange_rates.to_currency = inflow_candidates.currency
      )")
      .joins("JOIN accounts inflow_accounts ON inflow_accounts.id = inflow_candidates.account_id")
      .joins("JOIN accounts outflow_accounts ON outflow_accounts.id = outflow_candidates.account_id")
      .where("inflow_accounts.family_id = ? AND outflow_accounts.family_id = ?", self.id, self.id)
      .where("inflow_accounts.status IN ('draft', 'active')")
      .where("outflow_accounts.status IN ('draft', 'active')")
      .where("inflow_candidates.entryable_type = 'Transaction' AND outflow_candidates.entryable_type = 'Transaction'")
      .where("
        (
          inflow_candidates.currency = outflow_candidates.currency AND
          inflow_candidates.amount = -outflow_candidates.amount
        ) OR (
          inflow_candidates.currency <> outflow_candidates.currency AND
          ABS(inflow_candidates.amount / NULLIF(outflow_candidates.amount * exchange_rates.rate, 0)) BETWEEN 0.95 AND 1.05
        )
      ")
      .where(existing_transfers: { id: nil })
      .order("date_diff ASC") # Closest matches first
  end
```

```
def auto_match_transfers!
    # Exclude already matched transfers
    candidates_scope = transfer_match_candidates.where(rejected_transfers: { id: nil })

    # Track which transactions we've already matched to avoid duplicates
    used_transaction_ids = Set.new

    candidates = []

    Transfer.transaction do
      candidates_scope.each do |match|
        next if used_transaction_ids.include?(match.inflow_transaction_id) ||
               used_transaction_ids.include?(match.outflow_transaction_id)

        Transfer.create!(
          inflow_transaction_id: match.inflow_transaction_id,
          outflow_transaction_id: match.outflow_transaction_id,
        )

        Transaction.find(match.inflow_transaction_id).update!(kind: "funds_movement")
        Transaction.find(match.outflow_transaction_id).update!(kind: Transfer.kind_for_account(Transaction.find(match.outflow_transaction_id).entry.account))

        used_transaction_ids << match.inflow_transaction_id
        used_transaction_ids << match.outflow_transaction_id
      end
    end
  end
```

### Git-Style Checkpoint System for Financial Data

The application implements a checkpoint system similar to Git commits, allowing users to create snapshots of their financial state before major changes. This enables safe experimentation with categorization rules and import processes with reliable rollback capabilities.

#### Anchor-Based Balance Management

**Core Anchor System Architecture**
Maybe's checkpoint-like functionality is built on an anchor-based balance management system through the `Account::Anchorable` concern. This system uses two types of anchors as reference points: Opening anchors that establish starting balances when accounts are first created, and Current anchors that track the most recent balance state, particularly for accounts linked to external providers like Plaid.

**Dual Calculator Strategy**
The system implements two distinct balance calculation strategies depending on account management approach. The `Forward Calculator` is used for manual accounts where users enter transactions directly, calculating balances chronologically from entries starting from zero or an opening anchor. The `Reverse Calculator` is used for linked accounts that sync from external providers, starting with the current balance and calculating backwards to derive historical balances.

**Balance Update Management**
implements different strategies based on account characteristics. For cash accounts without reconciliations, the Transaction Adjustment Strategy adjusts the opening balance by calculating the delta needed to reach the desired current balance, preventing timeline clutter with unnecessary reconciliation entries. For accounts with existing reconciliations, the Value Tracking Strategy appends new reconciliation valuations to track value changes over time.

#### Entry-Based Immutable Ledger

**Immutable Financial Records**
Rather than traditional git-style commits, Maybe uses an entry-based ledger where all financial events (transactions, trades, valuations) are stored as immutable Entry records. This approach creates a complete audit trail without requiring explicit checkpoints, as the balance calculators can process these entries to derive account balances at any point in time.

**Checkpoint-Like Functionality**
The anchor system provides checkpoint-like functionality while being specifically optimized for financial data management. Unlike git's commit-based history, Maybe's system maintains continuous balance calculations and supports both forward and reverse synchronization patterns needed for manual entry and external data integration scenarios.

**Safe Experimentation Framework**
Users can safely experiment with categorization rules and import processes because the immutable entry system preserves the original financial data. The anchor points serve as stable reference points that enable rollback capabilities, allowing users to revert changes without losing historical accuracy or data integrity.

### Smart Import Template Suggestions

The import system learns from previous successful imports, suggesting column mappings and configurations based on similar import types and file formats. This reduces repetitive configuration for users who regularly import data from the same sources.

The system searches for templates using these criteria:

- Same family
- Same import type (TransactionImport, TradeImport, etc.)
- Same target account (if specified)
- Completed status only
- Most recent first

## Conclusion

Maybe Finance demonstrates how sophisticated financial software can be built using Ruby on Rails while maintaining focus on accuracy, usability, and architectural clarity. The open-sourcing of this million-dollar codebase provides valuable insights into production-grade financial application development.

The architecture successfully balances complexity and maintainability through careful domain modeling, intelligent automation, and user-centric design. The multi-tenant family structure, polymorphic account system, and transfer-aware transaction handling represent thoughtful solutions to common personal finance software challenges.

While the original company has pivoted away from personal finance, the open-source codebase continues to serve as an excellent reference implementation for developers building financial applications. The emphasis on self-hosting capabilities and manual data management makes Maybe particularly valuable for users who prioritize data ownership and privacy in their financial management tools.

The codebase exemplifies how modern web applications can handle complex financial domains while maintaining clean, testable, and deployable architecture suitable for both individual use and community-driven development.
