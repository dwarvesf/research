---
title: Utilizing cached table for binance kline api data processing
description: Learn how to speed up Binance Kline API data retrieval by using a cached table to efficiently get highest and lowest cryptocurrency prices and timestamps within large date ranges.
date: 2023-06-07
github_id: thminhVN
icy: 10
redirect:
  - /s/SaTR1A
---

## Introduction

The Binance Kline API provides valuable data on cryptocurrency prices and timestamps. However, working with this API poses certain challenges, such as limitations on the number of records per request and requests per minute. This technical document proposes a solution to efficiently handle large date ranges and multiple symbols by utilizing a cached table.

## Requirement

The main requirement is to obtain the highest and lowest prices along with their corresponding timestamps within a given date range. This information needs to be retrieved within a reasonable time frame, considering the limitations of the Binance Kline API.

## Challenge

There are two primary challenges associated with working with the Binance Kline API:

1. Limitations on records and requests: The API restricts each request to a maximum of 1000 records and allows only 2400 requests per minute. Consequently, processing long date ranges could take a significant amount of time. For example, a two-year date range would require approximately 10250 requests per symbol.
2. Increased wait times for multiple symbols: If data is required for multiple symbols simultaneously, the wait time becomes even longer.

To address these challenges, the solution aims to ensure a wait time of less than 10 seconds.

## Approach

The proposed approach involves caching the highest and lowest price values, along with their timestamps, to expedite data retrieval. A table called "market_data_symbols" will be created and structured as follows:

1. symbol: Represents the cryptocurrency symbol.
2. highest_price: Stores the highest price value for the symbol.
3. highest_timestamp: Stores the corresponding timestamp for the highest price.
4. lowest_price: Stores the lowest price value for the symbol.
5. lowest_timestamp: Stores the corresponding timestamp for the lowest price.
6. date: Represents the date for which the data is cached.

## Implementation

The implementation of this approach consists of the following steps:

1. Retrieve the list of symbols from the Binance exchange API.
2. Iterate through the 1-minute kline data for each symbol and store the relevant market data in the "market_data_symbols" table, including the fields mentioned earlier.
3. By utilizing this cached table, the need to recalculate price peaks for an extensive date range is significantly reduced.
4. Set up a cron job to periodically update the cached data, ensuring that the table remains up to date.
5. The diagram below illustrates the flow of creating the market data table:

![[utilizing-cached-table-for-binance-kline-api-data-processing.png|500]]

## Results and limitation

### Result

Upon successful creation of the cached table, the following results can be observed:

- Data retrieval for more than 200 symbols within a 2-year date range can be accomplished in less than 10 seconds.
- There is no need to make additional requests to the Binance Kline API, as the cached table provides the required data efficiently.

### Limitation

While the proposed solution offers significant advantages, it also has certain limitations:

- The initial creation of the cached table may require a substantial amount of time. To mitigate this, the use of multiple threads and proxies can help bypass quota limitations imposed by Binance.

### Conclusion

By employing a cached table to store and retrieve Binance Kline API data, the challenges of working with limited records and requests can be addressed effectively.
