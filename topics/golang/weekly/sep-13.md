---
title: "Go commentary #11: The gopher's LLM revolution - actors, frameworks, and the future of Go"
short_title: "#11 Actors, Frameworks, and the Future of Go"
description: "A critical look at Go's evolving role in the LLM ecosystem and the frameworks shaping its future"
date: 2024-09-13
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/ITUJkQ
---

## [Go Survey](https://google.qualtrics.com/jfe/form/SV_ei0CDV2K9qQIsp8?s=b)

- The feedbacks from us - Gophers will help Go Team to understand:
  - How Go is being used across various industries and organizations
  - The challenges you face as a Go developer
  - The features and improvements you’d like to see in future releases
  - How we can better support the thriving Go community

## [Building LLM-powered applications in Go](https://go.dev/blog/llmpowered)

Ah, the sweet smell of progress mixed with the stench of hype. Welcome to the brave new world of Go, where Large Language Models reign supreme and every developer suddenly fancies themselves an AI expert. But before we dive headfirst into this cesspool of buzzwords and overengineered solutions, let's take a moment to examine what's really going on in our beloved gopher-land.

The LLM Gold Rush: Go's Ticket to Relevance? It seems the Go team has finally woken up to the fact that LLMs are the new darling of the tech world. Their recent blog post on "Building LLM-powered applications in Go" reads like a desperate attempt to stay relevant in a landscape dominated by Python frameworks. But here's the kicker - they might actually be onto something.

Go's strengths in concurrency and networking make it a natural fit for the distributed nature of LLM applications. It's like watching a middle-aged dad suddenly discover he's got a knack for TikTok dances - unexpected, slightly uncomfortable, but oddly compelling.

Let's look at their RAG server example:

```Go
func main() {
	ctx := context.Background()
	wvClient, err := initWeaviate(ctx)
	if err != nil {
		log.Fatal(err)
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	genaiClient, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatal(err)
	}
	defer genaiClient.Close()

	server := &ragServer{
		ctx:      ctx,
		wvClient: wvClient,
		genModel: genaiClient.GenerativeModel(generativeModelName),
		embModel: genaiClient.EmbeddingModel(embeddingModelName),
	}

	mux := http.NewServeMux()
	mux.HandleFunc("POST /add/", server.addDocumentsHandler)
	mux.HandleFunc("POST /query/", server.queryHandler)

	port := cmp.Or(os.Getenv("SERVERPORT"), "9020")
	address := "localhost:" + port
	log.Println("listening on", address)
	log.Fatal(http.ListenAndServe(address, mux))
}
```

[full version at](https://github.com/golang/example/blob/master/ragserver/ragserver/main.go)

Simple, clean, and to the point. No fancy decorators, no convoluted class hierarchies - just good old Go simplicity. It's almost refreshing in a world of over-abstracted Python monstrosities.

But here's where things get interesting. The Go team isn't content with just providing raw tools; they're pushing frameworks like LangChainGo and Genkit. It's as if they've looked at the Python ecosystem and thought, "Hey, we can create incomprehensible abstractions too!"

LangChainGo: Because We Needed Another Layer of Abstraction LangChainGo promises to be the silver bullet for all your LLM needs. Want to switch vector databases without rewriting your entire codebase? LangChainGo's got you covered:

```Go
type VectorStore interface {
    AddDocuments(ctx context.Context, docs []schema.Document, options ...Option) ([]string, error)
    SimilaritySearch(ctx context.Context, query string, numDocuments int, options ...Option) ([]schema.Document, error)
}
```

It's a beautiful interface, really. So clean, so abstract. But let's be real - how often are you actually switching vector databases? This is solution in search of a problem, the software equivalent of a Swiss Army knife when all you needed was a bottle opener.

Genkit: Google's Answer to... Everything? Not to be outdone, Google throws its hat into the ring with Genkit. It's like LangChain, but with that special Google touch that screams, "We'll deprecate this in two years, but trust us for now!"

Genkit promises "production features" and "integrated developer tooling." Because apparently, what the world really needed was another way to manage prompts and deployments. It's as if Google looked at the mess of AI tooling and thought, "You know what this needs? More complexity!"

### [The Ergo Framework: Erlang's Ghost Haunts Go](https://github.com/ergo-services/ergo)

Just when you thought we couldn't possibly need another framework, along comes Ergo. It's bringing the actor model to Go, because apparently, we all miss the days of Erlang and its byzantine approach to concurrency.

Ergo boasts features like _Network Transparency_, _Observability_ and a _Supervisor Tree_. It's like they've taken every buzzword from distributed systems and thrown them into a blender. The result? A framework that promises to solve problems you didn't even know you had.

Here's a taste of their "Quick Start":

```bash
$ ergo -init MyNode \
      -with-app MyApp \
      -with-sup MyApp:MySup \
      -with-actor MySup:MyActor \
      -with-web MyWeb \
      -with-actor MyActor2 \
      -with-observer
```

Because nothing says "simplicity" like a command line that looks like it was designed by a committee of enterprise architects.

The Gopher's Dilemma So here we are, standing at the crossroads of Go's future. On one side, we have the simplicity and performance that made Go great. On the other, we have a smorgasbord of frameworks and abstractions promising to turn Go into a one-stop shop for all your LLM needs.

The question is, do we really need all this? Are we solving real problems, or are we just creating new ones in the name of "progress"?

Don't get me wrong - it's exciting to see Go evolving and adapting to new challenges. But let's not lose sight of what made Go great in the first place. We don't need to become Python or Erlang. We need to be the best damn Go we can be.

As we forge ahead into this brave new world of LLMs and AI, let's remember the virtues of simplicity and pragmatism. By all means, let's embrace new technologies and paradigms. But let's do it the Go way - with clear, concise code that solves real problems, not imaginary ones.

The future of Go in the LLM era is bright, but it's up to us to ensure it doesn't become a tangled mess of frameworks and abstractions. Let's build tools that empower developers, not confuse them. After all, isn't that what Go was all about in the first place?

Remember, in the world of software development, the only constant is change. But that doesn't mean we have to lose our way. Stay sharp, stay critical, and above all, stay Go.

---

https://go.dev/blog/survey2024-h2

https://go.dev/blog/llmpowered

https://github.com/ergo-services/ergo
