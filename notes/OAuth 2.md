---
title: null
description: null
date: null
tags:
  - oauth
redirect:
  - /s/C3IvdA
---

Traditional client-server authentication model: resource owner provides credentials for client to access resource

### Problems & limitations

- Store credentials on the third-party to reuse => stolen credentials risk
- Password authentication => weak
- Resource owner does not have ability to restrict accessible resource
- Could not revoke access for specific party
- Intermediary hold user credentials => lost protected info

OAuth2 was born to resolve above problem

### OAuth2

OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.

#### Roles

- Resource owner: server, end user - an entity capable of granting access to a protected resource
- Resource server: the server hosting the protected resources
- Client: the application making protected resource requests on behalf of the resource owner and with its authorization
- Authorization server: the server issuing access tokens to the client after successful authentication of the resource owner and obtaining authorization

Note: The authorization server may be the same server as the resource server or a separate entity. A single authorization server may issue access tokens accepted by multiple resource servers.

#### Authorization grant

Have 4 types

- Authorization code

  - Using an authorization server as intermediary between client and resource owner
  - Authorization code is a temporary code that the client will exchange for an access token
  - Authorization server authenticates the resource owner and obtains authorization
  - client call to autho server => redirect to resource owner and verified owner with autho server => send autho code to client => exchange code + client secret to autho server => access token
  - Resource owner's credentials are never shared with the client.
  - Server to server communication.

- Implicit
  - Simplified authorization code flow
  - Instead of issuing the client an authorization code, the client is issued an access token directly
- Resource owner password credentials
  - User resource owner username and password directly
- Client credentials
  - Each client has it own identifier and password.
  - The authorization server MUST support the HTTP Basic authentication scheme for authenticating clients that were issued a client password.
  - Or including the client credentials in the request-body using the following parameters: client_id and client_secret (NOT RECOMMENDED and SHOULD be limited)

#### Access token

- Credentials to access protected resource
- Opaque to the client
- Tokens represent specific scopes and durations of access
- Abstraction layer => replacing different authorization constructs (e.g., username and password) => more restrictive than authorization code => resource server does not need to understand a wide range of authentication methods.
- Access tokens can have different formats, structures, and methods of utilization (e.g., cryptographic properties)
- ttl is usually short, take advantage of refresh token => decrease ability to take by bad guy

#### Refresh token

- Refresh tokens are credentials used to obtain access tokens when
  - Access token becomes invalid or expires
  - Obtain additional access tokens with identical or narrower scope
- Issued to the client by the authorization server
- Refresh tokens are intended for use only with authorization servers and are never sent to resource servers

#### Refresh token can be stolen

To resolve this problem we have "The Proof Key for Code Exchange (PKCE, pronounced pixie) extension describes a technique for public clients to mitigate the threat of having the authorization code intercepted. The technique involves the client first creating a secret, and then using that secret again when exchanging the authorization code for an access token. This way if the code is intercepted, it will not be useful since the token request relies on the initial secret" - rfc7636

In March 2019, the OAuth 2.0 Security Best Current Practice deprecated the Implicit flow in favor of the Authorization Code flow with PKCE (Proof Key for Code Exchange).

#### Why are Refresh Tokens considered insecure for an SPA?

The refresh tokens are not used in SPAs, because in order to use it - and to get a new access token from the /token, the SPA needs to have a client secret, which cannot be stored securely in a browser. But since the OAuth 2.0 for Native Apps RFC recommends not requiring a client secret for the /token endpoint (for public clients), the refresh tokens could be used even in SPAs.

How to resolve or decrease this problem?

- Refresh token Rotation + BFF
- Silent authentication

**Protocol Flow:**

```
     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +———————--------+
```

**Refresh token flow **

```
  +--------+                                           +---------+
  |        |--(A)------- Authorization grant --------->|         |
  |        |                                           |         |
  |        |<-(B)----------- Access token -------------|         |
  |        |               & Refresh token             |         |
  |        |                                           |         |
  |        |                            +----------+   |         |
  |        |--(C)---- Access token ---->|          |   |         |
  |        |                            |          |   |         |
  |        |<-(D)- Protected Resource --| Resource |   | Auth    |
  | Client |                            |  Server  |   | Server  |
  |        |--(E)---- Access token ---->|          |   |         |
  |        |                            |          |   |         |
  |        |<-(F)- Invalid Token Error -|          |   |         |
  |        |                            +----------+   |         |
  |        |                                           |         |
  |        |--(G)----------- Refresh token ----------->|         |
  |        |                                           |         |
  |        |<-(H)----------- Access token -------------|         |
  +--------+           & Optional Refresh token        +———————--+

```

---

#### Reference

- https://datatracker.ietf.org/doc/html/rfc6749
- https://gaynwinters.wordpress.com/tag/user-agent-based-application/
- https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/
- https://portswigger.net/web-security/oauth/grant-types
- https://www.pingidentity.com/en/company/blog/posts/2021/refresh-token-rotation-spa.html
- https://stackoverflow.com/questions/54199636/what-is-the-difference-between-using-refresh-token-and-silent-authentication-for
- https://datatracker.ietf.org/doc/html/rfc7636
