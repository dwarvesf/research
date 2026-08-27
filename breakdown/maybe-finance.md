---
draft: false
title: Maybe finance breakdown
short_title: Maybe finance
description: An in-depth analysis of a $1M open-source personal finance application built with Ruby on Rails
date: 2025-08-15
authors:
  - quanghuynguyen1902
tags:
  - breakdown
  - finance
  - ruby-on-rails
  - rails
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

### Application infrastructure

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

### Core data model

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

#### Primary models

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

#### Specialized models

**Transaction**

- Core personal finance activity (purchases, deposits, transfers)
- Automatic transfer detection prevents double-counting in budgets
- Supports categorization and tagging for organization
- Handles complex transfer scenarios between family accounts

**Investment system**

- Security: Investable assets with market data
- Holding: Current positions in investment accounts
- Trade: Buy/sell transactions with quantity, price, fees
- Enables portfolio valuation and performance tracking

**Category & tag system**

- Categories: Hierarchical organization for budgeting
- Tags: Flexible, non-hierarchical cross-cutting analysis
- Supports both income and expense classification

**Import system**

- Handles CSV imports, Mint exports, other financial software
- Type-specific models (TransactionImport, TradeImport, AccountImport)
- Intelligent format detection and validation
- Robust data migration capabilities

**Institution Integration**

- Institution: Financial institution metadata
- PlaidItem/PlaidAccount: API integration management
- Supports both automated syncing and manual entry
- Fallback mechanisms for connection failures

**Multi-currency support**

- Consistent currency storage at account level
- Family-level default currency for aggregation
- Money objects handle conversion and arithmetic
- Exchange rate integration for accurate cross-currency calculations

## Technical challenges

#### Caching performance optimization

**Multi-Layered Caching Architecture**
Maybe implements a comprehensive multi-layered caching strategy to handle the performance demands of financial data processing. The core caching system is built around the Family model's cache key management, which creates cache keys that automatically invalidate when account data changes, using sync timestamps and account update times as invalidation triggers. The system also maintains separate cache versioning for entry-related calculations, ensuring that different types of financial data have appropriate invalidation strategies.

```mermaid
flowchart TD
    %% User Entry
    A[User Request] --> B{HTTP ETag}

    %% Three Cache Layers
    B -->|Hit| C[304 Not Modified]
    B -->|Miss| D{Rails Cache}
    D -->|Hit| E[Return Cached Data]
    D -->|Miss| F{Memoization}
    F -->|Hit| G[Return Memoized Data]
    F -->|Miss| H[Execute Query]

    %% Data Flow
    H --> I[Store in All Layers]
    I --> J[Return Data]

    %% Invalidation
    K[Data Changes] --> L[Clear All Caches]
    L --> B
```

**Three-tier cache strategy**

**Layer 1: HTTP ETag cache**
The fastest response path uses HTTP ETags to return 304 Not Modified responses when client-side data hasn't changed. This eliminates server processing entirely for frequently accessed dashboard elements like sparklines and financial summaries, providing sub-millisecond response times.

**Layer 2: Rails Cache**
Server-side caching handles expensive database queries and financial calculations using intelligent cache key generation. The system uses memory store in development and Redis in production, with cache keys that automatically invalidate when underlying financial data changes through sync timestamps and account update tracking.

**Layer 3: Memoization**
Instance-level caching stores calculation results in Ruby instance variables during single requests. This prevents redundant balance calculations and chart data generation when the same financial metrics are accessed multiple times within a request cycle.

**Smart cache key management**
The caching mechanism centers around the Family model as the cache coordinator, generating composite cache keys that include family ID for multi-tenant isolation, sync completion timestamps for data-dependent invalidation, and account update times for granular cache control. This hierarchical approach ensures cache invalidation cascades appropriately from family-level changes down to individual account calculations.

### Multi-currency complexity

**Challenge**: Supporting global users requires handling multiple currencies within the same family's financial data. Exchange rate fluctuations, currency conversion accuracy, and meaningful aggregation across currencies present significant technical challenges.

**Solution**: The architecture stores both amount and currency for every financial entry, using the Synth Finance API for real-time exchange rates. The family's default currency serves as the base for aggregation, while individual accounts maintain their native currencies. Money objects handle conversion mathematics with proper precision.

![multi-currency-system](./assets/maybe-multi-currency.png)

#### Exchange rate caching strategy

**Multi-layer caching architecture**
Maybe implements a sophisticated caching strategy to minimize external API calls while ensuring rate accuracy. The system employs a database-first lookup approach where exchange rates are stored locally in a dedicated ExchangeRate model. When a rate is needed, the system first checks the local cache before making external provider requests to Synth Finance API.

**Cache optimization logic**
The caching mechanism uses intelligent cache management where rates are stored with currency pair and date as composite keys, enabling fast lookups for historical data. The system can optionally cache newly fetched rates for future use, reducing redundant API calls for commonly requested currency pairs. Cache invalidation ensures stale rates don't affect calculations while maintaining performance benefits.

#### LOCF (Last Observation Carried Forward) algorithm

```
-- Last observation carried forward (LOCF), use the most recent balance on or before the chart date
          LEFT JOIN LATERAL (
            SELECT b.balance, b.cash_balance
            FROM balances b
            WHERE b.account_id = accounts.id
              AND b.date <= d.date
            ORDER BY b.date DESC
            LIMIT 1
          ) last_bal ON TRUE

-- Last observation carried forward (LOCF), use the most recent exchange rate on or before the chart date
          LEFT JOIN LATERAL (
            SELECT er.rate
            FROM exchange_rates er
            WHERE er.from_currency = accounts.currency
              AND er.to_currency = :target_currency
              AND er.date <= d.date
            ORDER BY er.date DESC
            LIMIT 1
          ) er ON TRUE
```

**Gap-filling strategy**
LOCF represents the core algorithm for handling missing exchange rate data across weekends, holidays, and provider outages. When the system encounters missing rate data for a specific date, it automatically carries forward the most recent available rate from a previous date.

**Implementation process**
The LOCF algorithm iterates through each date in a target range, checking for existing rates in both database cache and external providers. When no rate is available from either source, the algorithm uses the previous rate value to fill the gap. This previous rate value is continuously updated as the algorithm progresses through the date range, ensuring continuous data coverage.

**Application areas**
LOCF is implemented across multiple system components. In exchange rate imports, it ensures continuous rate coverage when external providers don't return weekend or holiday data. For security price data, the same strategy fills gaps in stock and investment prices when markets are closed. In balance chart calculations, LOCF operates at the SQL level using lateral joins to find the most recent balance and exchange rate on or before each chart date.

**Data consistency benefits**
The LOCF strategy prevents broken financial charts and ensures consistent calculations even when external data sources have gaps. This approach is particularly crucial for time series analysis where continuous data is essential for accurate trend visualization and portfolio valuation. The algorithm maintains historical accuracy while providing seamless user experience across different market conditions and data provider limitations.

## Clever tricks and tips

### Polymorphic account architecture with delegated types

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

### Transfer auto-detection algorithm

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

### Git-Style checkpoint system for financial data

The application implements a checkpoint system similar to Git commits, allowing users to create snapshots of their financial state before major changes. This enables safe experimentation with categorization rules and import processes with reliable rollback capabilities.

#### Anchor-based balance management

```mermaid
flowchart TD
    %% Account Types
    A[Account Created] --> B{Account Type}
    B -->|Manual| C[Opening Anchor]
    B -->|Linked| D[Current Anchor]

    %% Calculation Direction
    C --> E[Forward Calculation]
    D --> F[Reverse Calculation]

    %% Balance Flow
    E --> G[Opening Balance + Transactions = Current Balance]
    F --> H[Current Balance - Transactions = Historical Balance]

    %% Anchor System Benefits
    subgraph "Anchor Benefits"
        I[Reference Points]
        J[Safe Rollback]
        K[Data Integrity]
    end

    %% Immutable Foundation
    G --> L[Immutable Entry Ledger]
    H --> L
    L --> I
    L --> J
    L --> K

    %% User Experience
    I --> M[Experiment Safely]
    J --> M
    K --> M
```

**Core anchor system architecture**
Maybe's checkpoint-like functionality is built on an anchor-based balance management system through the `Account::Anchorable` concern. This system uses two types of anchors as reference points: Opening anchors that establish starting balances when accounts are first created, and Current anchors that track the most recent balance state, particularly for accounts linked to external providers like Plaid.

**Dual calculator strategy**
The system implements two distinct balance calculation strategies depending on account management approach. The `Forward Calculator` is used for manual accounts where users enter transactions directly, calculating balances chronologically from entries starting from zero or an opening anchor. The `Reverse Calculator` is used for linked accounts that sync from external providers, starting with the current balance and calculating backwards to derive historical balances.

**Balance update management**
implements different strategies based on account characteristics. For cash accounts without reconciliations, the Transaction Adjustment Strategy adjusts the opening balance by calculating the delta needed to reach the desired current balance, preventing timeline clutter with unnecessary reconciliation entries. For accounts with existing reconciliations, the Value Tracking Strategy appends new reconciliation valuations to track value changes over time.

#### Entry-based immutable ledger

**Immutable financial records**
Rather than traditional git-style commits, Maybe uses an entry-based ledger where all financial events (transactions, trades, valuations) are stored as immutable Entry records. This approach creates a complete audit trail without requiring explicit checkpoints, as the balance calculators can process these entries to derive account balances at any point in time.

**Checkpoint-like functionality**
The anchor system provides checkpoint-like functionality while being specifically optimized for financial data management. Unlike git's commit-based history, Maybe's system maintains continuous balance calculations and supports both forward and reverse synchronization patterns needed for manual entry and external data integration scenarios.

**Safe experimentation framework**
Users can safely experiment with categorization rules and import processes because the immutable entry system preserves the original financial data. The anchor points serve as stable reference points that enable rollback capabilities, allowing users to revert changes without losing historical accuracy or data integrity.

### Smart import template suggestions

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
