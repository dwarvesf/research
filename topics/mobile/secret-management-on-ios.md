---
title: Secret management on iOS
description: Learn the best ways to securely manage and store secrets in iOS apps, from code obfuscation to why keeping secrets off the client is the safest approach for developers.
date: 2022-09-09
redirect:
  - /s/97WYfw
---

One thing that I realized after few years doing iOS application development. iOS developer seem not handle secret management properly. Secret management is one of important aspects which we should think about when doing the software development. And while other side (like backend/frontend) have no problem with it, or they already have a common standard for doing it. in iOS world, people do it in many different ways or worst, not do it at all.

There is few reasons I can think of:

- Apple does not give us the good document (best practices) for handling this.
- The sandbox mechanism on iOS, which makes reverse-engineering an application is really hard.

So the purpose of this article is to answer for the question "How do I store secrets securely on the client?"

There are several ways to manage secret info

### Level 1: Hard-code secrets in source code

```swift
enum Secrets {
    static let apiKey = "6a0f0731d84afa4082031e3a72354991"
}
```

**The issues**

- The secret apiKey still can be found by using a **reverse-engineering** tool like [Radare2](https://rada.re/)
- Live forever in source control

### Level 2: Store Secrets in Xcode Configuration and `Info.plist`

We can use the xcconfig file to externalize configuration from code (12-Factor app). And then read them from `Info.plist`.

```swift
// Development.xcconfig
API_KEY = 6a0f0731d84afa4082031e3a72354991

// Release.xcconfig
API_KEY = d9b3c5d63229688e4ddbeff6e1a04a49
```

```swift
// Environment.swift
public enum Environment {
    // MARK: - Keys
    enum Keys {
        enum Plist {
            static let apiKey = "API_KEY"
        }
    }

    // MARK: - Plist
    private static let infoDictionary: [String: Any] = {
        guard let dict = Bundle.main.infoDictionary else {
            fatalError("Plist file not found")
        }
        return dict
    }()

    // MARK: - Plist values
    static let apiKey: String = {
        guard let url = Environment.infoDictionary[Keys.Plist.apiKey] as? String else {
            fatalError("API Key is not set in plist for this environment")
        }
        return url
    }()
}
```

I did apply this for my old project. Check it here [Sudo FM](https://github.com/dwarvesf/sudo-fm-macos)

In this way, the reverse-engineer tools won't work. **BUT**

**The issues**

- The API key will be store in `Info.plist` file and anyone can read it, even if we archive the app, they just need to open the App bundle content 🤦‍♂
- This still work in case our application's platform is iOS and our archive file is not leaked.

### Level 3: Obfuscate secrets using code generation

We can use a combination of Swift and Python code (via GYB) to obfuscate secrets in a way that’s more difficult to reverse-engineer.

Secrets are pulled from the environment and encoded by a Python function before being included in the source code as `[UInt8]` array literals. Those encoded values are then run through an equivalent Swift function to retrieve the original value without exposing any secrets directly in the source.

The resulting code looks something like this:

```swift
// Secrets.swift
enum Secrets {
    private static let salt: [UInt8] = [
        0xa2, 0x00, 0xcf, …, 0x06, 0x84, 0x1c,
    ]

    static var apiKey: String {
        let encoded: [UInt8] = [
            0x94, 0x61, 0xff, … 0x15, 0x05, 0x59,
        ]

        return decode(encoded, cipher: salt)
    }

    static func decode(_ encoded: [UInt8], cipher: [UInt8]) -> String {
        String(decoding: encoded.enumerated().map { (offset, element) in
            element ^ cipher[offset % cipher.count]
        }, as: UTF8.self)
    }
}

Secrets.apiKey // "6a0f0731d84afa4082031e3a72354991"
```

### Level 4: Don’t store secrets on-device

No matter how much we obfuscate a secret on the client, it’s only a matter of time before the secret gets out. Given enough time and sufficient motivation, an attacker will be able to reverse-engineer whatever you throw their way.

The only true way to keep secrets in mobile apps is to store them on the server.

### Client secrecy is impossible

**Rather than looking at client secret management as a problem to be solved, we should see it instead as an anti-pattern to be avoided.**

Any third-party SDK that’s configured with a client secret is insecure by design. If your app uses any SDKs that fits this description, you should see if it’s possible to **move the integration to the server**.

Restating our original question: “How do I store secrets securely on the client?”

The answer is: “Don’t (but if you must, obfuscation wouldn’t hurt).”

## References

- https://thoughtbot.com/blog/let-s-setup-your-ios-environments
- https://sarunw.com/posts/how-to-set-up-ios-environments/
- https://www.raywenderlich.com/21441177-building-your-app-using-build-configurations-and-xcconfig
- https://nshipster.com/xcconfig/
- https://nshipster.com/secrets/
