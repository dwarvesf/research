---
title: A and cname records in dns
description: Learn the key differences between A records and CNAME records in DNS, including their uses for domain mapping, subdomains, and IP address management to optimize your website setup.
date: 2022-01-06
github_id: namtrhg
icy: 10
redirect:
  - /s/MXVocA
---

**A record** and **CNAME** are one of the most common types of records when you want to deploy your `domain` or `subdomain` on the internet.

## Use-cases and restrictions

### A record

`A` record is an abbreviation for "Address". The address you type when you go to a website, send an email or connect to Twitter, Facebook or Instagram.
There are many things you can do with `A` records, including using multiple `A` records for the same domain to offer redundancy and fallbacks. Furthermore, many names may point to the same IP address, in which case each will have its own `A` record pointing to the same IP address.

![](assets/a-and-cname-records-in-dns_a_record_config_picture.webp)

#### Use-cases

- Use an `A` record if you manage which IP addresses are assigned to a particular machine, or if the IP are fixed (this is the most common case).

### CNAME record

`A CNAME` is a database entry in the Domain Name System (DNS) that indicates that one domain name is a alias for another. The `CNAME`, often known as the "true name" is especially crucial when multiple services are running from the same IP address.

![](assets/a-and-cname-records-in-dns_cname_record_config_picture.webp)

#### Use-cases

- To direct people to the main website from many websites owned by the same individual or organization.
- To assign a unique hostname to each network service, such as File Transfer Protocol (FTP) or email, and point it to the root domain.
- To assign a `subdomain` to each customer on the domain of a single service provider and use `CNAME` to point the `subdomain` to the customer's `root domain`.
- To register the same domain in many countries and direct each country's version to the main domain.

#### Restrictions

- A `CNAME` record should always link to another domain name rather than an IP address.
- A `CNAME` record cannot exist alongside another record with the same name. It is not feasible for `www.example.com` to have both a 'CNAME' and a 'TXT' record.
- A `CNAME` can point to another CNAME. However, this is not normally advised for performance reasons. To prevent needless performance overheads, the `CNAME` should point as nearly as feasible to the destination name when relevant.

## References

- <https://support.dnsimple.com/articles/differences-between-a-cname-alias-url/>
- <https://support.dnsimple.com/categories/dns/>
- <https://www.elegantthemes.com/blog/wordpress/what-is-an-a-record-and-how-is-it-different-from-cname-and-mx>
- <https://www.cloudflare.com/learning/dns/dns-records/#:~:text=What%20is%20a%20DNS%20record,handle%20requests%20for%20that%20domain>.
