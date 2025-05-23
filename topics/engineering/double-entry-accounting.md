---
title: Double entry accounting
description: Learn the basics of double-entry accounting, including assets, liabilities, equity, and how this system improves accuracy over single-entry bookkeeping for better financial tracking and reporting.
date: 2022-08-24
github_id: monotykamary
redirect:
  - /s/YMdCQQ
---

## Introduction

Double-entry accounting states that every financial transaction has equal and opposite effects in at least two different accounts. There are 3 main accounting types associated with this: _assets_, _liabilities_, and _equity_.

Accountants have an **accounting equation**, and it is used to check whether the bookkeeper has made a mistake if it is ever out of balance. This equation is commonly used in balance sheets/statement of affairs:

$$
\text{Assets} = \text{Liabilities} + \text{Equity}
$$

> [!INFO] We can derive a person's net worth to be the total equity they have:
>
> $$
> \text{Equity (Net Worth)} = \text{Assets} - \text{Liabilities}
> $$

### How is it different from single-entry?

Single-entry accounting involves writing down all entity transactions (revenues, expenses, payroll, etc.) in a single ledger. The database equivalent is a list of transactions that add or subtract money from an account. This lack of detail in recording makes it **difficult** to track assets and liabilities, and it is prone to mistakes.

### Single-entry example

The single-entry example allows us to calculate a closing balance, but it doesn't have the granularity to tell us whether this balance is from our bank balance or our total commodities.

| Date         | Details                      | Amount (USD) |
| ------------ | ---------------------------- | ------------ |
| Jan 1, 2020  | Opening Balance              | 0.00         |
| Jan 5, 2020  | Initial Investment           | 5000         |
| Jan 9, 2020  | MacBook purchase             | -2000        |
| Jan 11, 2020 | Domain Registration (1 year) | -35          |
| Jan 14, 2020 | Web Hosting Fees (1 year)    | -100         |
| Jan 16, 2020 | Advertising Expense          | -20          |
| Jan 18, 2020 | Product Sales                | 50           |
| Jan 20, 2020 | Bank Fees                    | -2           |
| Jan 23, 2022 | Product Sales                | 100          |
| Jan 27, 2022 | Taxes                        | -300         |
|              |                              |              |
|              | **Closing Balance**          | 2693         |

<!-- TBLFM: @>$3=sum(@I..@-1) -->

### Double-entry example

The double-entry example allows us to derive balances for our assets and liabilities on top of checking whether our assets, liabilities, and equity balance each other out.

| Date         | Details                      | Label (Account)             | Debit (USD) | Credit (USD) |
| ------------ | ---------------------------- | --------------------------- | ----------- | ------------ |
| Jan 1, 2020  | Opening Balance              | Assets:Bank                 | 0           |              |
|              |                              | Equity:Opening Balance      |             | 0            |
| Jan 5, 2020  | Initial Investment           | Assets:Bank                 | 5000        |              |
|              |                              | Equity:Opening Balance      |             | 5000         |
| Jan 9, 2020  | MacBook purchase             | Equity:Expenses:Electronics | 2000        |              |
|              |                              | Assets:Bank                 |             | 2000         |
| Jan 11, 2020 | Domain Registration (1 year) | Equity:Expenses:Web         | 35          |              |
|              |                              | Liabilities:Credit Card     |             | 35           |
| Jan 14, 2020 | Web Hosting Fees (1 year)    | Equity:Expenses:Web         | 100         |              |
|              |                              | Liabilities:Credit Card     |             | 100          |
| Jan 16, 2020 | Advertising Expense          | Equity:Expenses:Marketing   | 20          |              |
|              |                              | Assets:Bank                 |             | 20           |
| Jan 18, 2020 | Product Sales                | Assets:Bank                 | 50          |              |
|              |                              | Equity:Revenue              |             | 50           |
| Jan 20, 2020 | Bank Fees                    | Equity:Expenses             | 2           |              |
|              |                              | Assets:Bank                 |             | 2            |
| Jan 23, 2022 | Product Sales                | Assets:Bank                 | 100         |              |
|              |                              | Equity:Revenue              |             | 100          |
| Jan 27, 2022 | Sales Tax                    | Liabilities:Taxes:Sales     | 15          |              |
|              |                              | Assets:Bank                 |             | 15           |
|              |                              |                             |             |              |
|              |                              | **Total**                   | 7322        | 7322         |

<!-- TBLFM: @>$4=sum(@I..@-1) -->
<!-- TBLFM: @>$5=sum(@I..@-1) -->

### Reasons and proponents for accounting in double-entry

In a double-entry accounting system, a debit in one account offsets a credit in another, the sum of **all debits** must equal the sum of **all credits**. The system standardizes the accounting process and improves the accuracy of prepared financial statements, and enables us to detect errors in cases of fraud or laundering.

Double-entry systems, regardless of whether we keep track of journal entries, allow us to create reports on income statements, balance sheets, statements of cash flows, and statements of retained earnings.

## Database design

For database design, refer to [[Database design for double-entry accounting | database design for double-entry accounting]].

---

## Accounting types

### Assets

> **"How much do I have?"**

Assets refer to anything of value that an entity owns. They are represented as a **debit balance**. Assets are generally divided into 2 categories:

- **Current assets**: anything that can be consumed, sold, or converted into cash within a year
  - _Inventory_: stocked goods you intend to sell
  - _Receivables_: payments your clients and customers owe you
  - _Cheques_: a document that orders a bank to pay out money to a person's account
- **Fixed assets**: assets which are purchased for long-term use and are not likely to be converted quickly into cash within a year; these include, but are not limited to: buildings, land, machinery, vehicles, software, etc.

### Liabilities

> **"How much do I owe?"**

Liabilities refer to any debts the entity has. They are represented as a **credit balance**. Liabilities are divided into 3 categories:

- **Current liabilities**: any debts that you owe within the next 12 months
  - _Taxes_: a debt owed to a taxing authority; these include, but are not limited to income tax, sales tax, and capital gains tax
  - _Credit cards_: a debt owed to the bank through the medium of a scannable card
  - _Salaries and wages payable_: agreements of payment to employees as a form of debt
  - _Short-term loans_: loans taken from an institution to be paid within the year
  - _Overdrafts_: a deficit in a bank account allowed by a bank to draw more money than the account holds
- **Non-current liabilities**: long-term debt that goes beyond 12 months
  - _Long-term loans_: loans with repayment terms usually longer than five years
  - _Mortgages_: a loan to purchase or maintain real estate from a financial institution
- **Contingent liabilities**: liabilities that may occur depending on the outcome of a future event
  - _Lawsuits_: a claim or dispute brought to the court of law
  - _Product warrenties_: a guarantee a manufacture or similar party regarding the condition of the product

### Equity

> **"How much is left over?"**

If we follow the equation for net worth, assets minus liabilities would give us our total equity. However, equity from the perspective of a transaction refers to the value of something. Say, for instance, when you start a ledger, there was $100 in your checking account. Where will that money come from? The answer is **your equity**.

If you have a kidney worth $262,000, then you have $262,000 in equity in that kidney. To convert the kidney (a commodity) into cash or to **credit** your bank account, you will have to **debit** your kidney by selling it.

> [!INFO]
>
> Types such as _expenses_, _revenue_, and _income_ are considered **subcategories** of _equity_.

There are quite a lot of subcategories of equity. This includes, but is not limited to:

- _Expenses_: the cost of money spent on something
- _Revenue_: money received generated from business operations
- _Income_: money received from an agreement, either through work or investment

Equity also reflects all kinds of assets that have not been debited as assets. In this case, equity is represented as a **credit balance**.

---

## Terminology

| Basis for comparison | Debit                                                 | Credit                                                  |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Meaning              | Refers to a record of money flowing _into_ an account | Refers to a record of money flowing _out of_ an account |

In accounting, every financial transaction of an entity is kept inside a **_journal_**. The entries inside the journal are used to create a general **_ledger_**. The differences between them are listed in the table below:

| Basis for comparison               | Journal                                                         | Ledger                                                                           |
| ---------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Meaning                            | The book which records all financial transactions of an entity  | The book that contains financial information needed to make                      |
| Known as                           | Book of original entry                                          | Book of secondary entry                                                          |
| Purpose                            | Used in preparation of a ledger                                 | Used for labelling balances for final accounts                                   |
| Transactions Recorded              | All entries are made in chronological order                     | Entries are organized by account                                                 |
| Debit and credit                   | Can be separated by columns or by entries                       | The left side of a ledger is often the debit side while the right side is credit |
| Narration (comment or description) | Required                                                        | Not required                                                                     |
| Balancing                          | Balancing is not done                                           | All accounts are balanced based on the 5 main accounting types                   |
| Granularity                        | Offers the highest granularity as all transactions are recorded | Offers little granularity in comparison as it only shows account data            |

## Appendix

### `hledger` for personal use

[`hledger`](https://hledger.org/) is a multi-currency double-entry accounting software that is accessible through the command-line/terminal. It is mostly inspired by [ledger-cli](https://www.ledger-cli.org/), but rewritten in Haskell with build support for M1 Mac machines.

```sh
$ hledger -f transactions.journal balance -t
            3113 USD  Assets:Bank
           -2993 USD  Equity
            2157 USD    Expenses
            2000 USD      Electronics
              20 USD      Marketing
             135 USD      Web
           -5000 USD    Opening Balance
            -150 USD    Revenue
            -120 USD  Liabilities
            -135 USD    Credit Card
              15 USD    Taxes:Sales
--------------------
                   0
```

```
## journal
2020-01-01 Opening Balance
    Assets:Bank                          0 USD
    Equity:Opening Balance               0 USD

2020-01-05 Initial Investment
    Assets:Bank                   5000 USD
    Equity:Opening Balance       -5000 USD

2020-01-09 MacBook purchase
    Equity:Expenses:Electronics        2000 USD
    Assets:Bank                       -2000 USD

2020-01-11 Domain Registration (1 year)
    Equity:Expenses:Web              35 USD
    Liabilities:Credit Card         -35 USD

2020-01-14 Web Hosting Fees (1 year)
    Equity:Expenses:Web             100 USD
    Liabilities:Credit Card        -100 USD

2020-01-16 Advertising Expense
    Equity:Expenses:Marketing          20 USD
    Assets:Bank                       -20 USD

2020-01-18 Product Sales
    Assets:Bank             50 USD
    Equity:Revenue         -50 USD

2020-01-20 Bank Fees
    Equity:Expenses           2 USD
    Assets:Bank              -2 USD

2020-01-23 Product Sales
    Assets:Bank            100 USD
    Equity:Revenue        -100 USD

2020-01-23 Sales tax
    Liabilities:Taxes:Sales          15 USD
    Assets:Bank                     -15 USD
```

## Reference

- <https://www.freshbooks.com/hub/accounting/an-accounting-journal>
- <https://bench.co/blog/accounting/double-entry-accounting/>
- <https://online-accounting.net/single-entry-bookkeeping-system/>
- <https://bench.co/blog/accounting/assets-liabilities-equity/>
- <https://corporatefinanceinstitute.com/resources/knowledge/accounting/types-of-liabilities/>
- <https://www.investopedia.com/terms/m/mortgage.asp>
- <https://www.investopedia.com/terms/w/warranty.asp#:~:text=our%20editorial%20policies-,What%20Is%20a%20Warranty%3F,as%20originally%20described%20or%20intended>.
- <https://www.ledger-cli.org/3.0/doc/ledger3.html#Understanding-Equity>
