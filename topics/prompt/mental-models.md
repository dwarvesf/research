---
draft: false
title: Mental models for prompting
description: Essential mental models to improve your LLM interactions and prompt engineering effectiveness
date: 2025-01-06
toc: true
authors:
  - tieubao
tags:
  - mental-models
  - llm
  - prompting
  - thinking-tools
  - decision-making
---

**Mental models are thinking frameworks that can dramatically improve your prompting effectiveness by helping you structure problems and guide AI reasoning.**

Mental models are simplified representations of how the world works. They're cognitive shortcuts that help us understand complex situations, make decisions, and predict outcomes. In the context of LLM prompting, these frameworks help you structure problems more effectively, anticipate AI responses, and design prompts that leverage proven thinking patterns.

Understanding and applying these models consciously can transform how you interact with LLMs by giving you a toolkit of proven reasoning approaches to draw from.

## Foundational thinking tools

### Circle of competence

Your personal sphere of expertise where your knowledge and skills are concentrated and your judgments are reliable.

When prompting about complex topics, explicitly define the boundaries of what you know and don't know. Ask the AI to help you identify when you're venturing outside your expertise.

```
For [complex topic]:
- What falls clearly within my area of expertise?
- Where am I approaching the limits of my knowledge?
- What assumptions am I making that might be wrong?
- Where should I seek expert input instead of relying on my judgment?
```

### The map is not the territory

Our mental models and representations of reality are not the same as reality itself.

Remind the AI that models, frameworks, and theories are simplifications. Ask it to consider what might be missing from any conceptual framework.

```
When analyzing [situation] using [framework]:
- What aspects of reality might this model be oversimplifying?
- What important details could we be missing?
- How might the real situation differ from our theoretical understanding?
- What would we need to observe to test if our model matches reality?
```

### Occam's razor

When faced with competing explanations, the simplest one that accounts for the facts is usually correct.

Ask the AI to identify the simplest explanation first, then explore when complexity might be necessary.

```
For [complex problem]:
- What's the simplest explanation that accounts for the key facts?
- What assumptions does this simple explanation make?
- When might we need a more complex explanation?
- Are we adding unnecessary complexity to our solution?
```

### Second-order thinking

Going beyond immediate consequences to consider the ripple effects and long-term implications of decisions.

Always ask the AI to think beyond first-order effects. This reveals unintended consequences and helps with strategic planning.

```
For [decision/action], analyze:
- What are the immediate, obvious consequences?
- Then what happens? What are the second-order effects?
- How might others respond to our action?
- What could this lead to 6 months or 2 years from now?
- What unintended consequences should we prepare for?
```

### Probabilistic thinking

Navigating uncertainty by thinking in terms of likelihood rather than certainties.

Ask the AI to express confidence levels and consider multiple scenarios rather than giving definitive answers.

```
Instead of asking "Will this work?", ask:
- What's the probability this approach succeeds?
- What are the different scenarios and their likelihood?
- What would increase or decrease these probabilities?
- How should we prepare for the most likely outcomes?
- What's our confidence level and what could change it?
```

### Thought experiment

Creating simplified models of reality to test ideas and explore implications without real-world constraints.

Use thought experiments to explore scenarios safely and reveal hidden assumptions in your thinking.

```
Create a thought experiment for [concept]:
- If we took this idea to its logical extreme, what would happen?
- What if the opposite were true?
- How would this work in a completely different context?
- What would an alien observer conclude about this situation?
```

## Problem analysis frameworks

### First principles thinking

Breaking down complex problems into fundamental truths and building solutions from the ground up.

Ask the AI to deconstruct problems to their basic elements before proposing solutions. This bypasses assumptions and conventional wisdom.

```
Break down [problem] to first principles:
- What are the fundamental truths we know for certain?
- What assumptions are we making that might not be true?
- If we started from scratch, what would we build?
```

### Backward chaining

Working backward from your desired outcome to determine the steps needed to get there.

Start your prompts by defining the end goal, then ask the AI to work backwards through necessary steps. This prevents meandering responses and ensures goal-oriented thinking.

```
Goal: Launch a successful product in 6 months
Work backwards: What are the key milestones needed to achieve this?
Start with launch day and trace back to today.
```

### Inversion principle

Looking at problems backward by considering what could go wrong instead of what could go right.

Ask the AI to identify what could go wrong, failure points, or what NOT to do before providing solutions. This surfaces edge cases and strengthens recommendations.

```
Before recommending a marketing strategy, first identify:
- What marketing approaches have failed spectacularly for similar products?
- What assumptions could be completely wrong?
- What would guarantee this campaign fails?
```

### 5 Whys analysis

A root cause analysis technique that asks "why" repeatedly to drill down to the core issue.

Use this to get the AI to dig deeper into problems rather than addressing surface symptoms.

```
Apply 5 Whys to [problem]:
- Why does this problem occur?
- Why does that cause happen?
- Continue asking "why" until you reach the root cause
- What solution addresses this fundamental cause?
```

### MECE framework

Mutually Exclusive, Collectively Exhaustive - a way to organize information without gaps or overlaps.

Ask the AI to structure analysis so all possibilities are covered without redundancy. This ensures comprehensive thinking.

```
Organize all aspects of [problem] using MECE:
- Create categories that don't overlap
- Ensure all possibilities are covered
- What solution emerges from this complete picture?
```

### SWOT analysis

A framework for evaluating Strengths, Weaknesses, Opportunities, and Threats in any situation.

Use SWOT to get comprehensive situational analysis from the AI. This provides a structured way to examine all angles of a problem or opportunity.

```
Analyze [topic] using SWOT framework:
- 3 key strengths we can leverage
- 3 critical weaknesses to address
- 3 biggest opportunities to pursue
- 3 major threats to mitigate
```

### Pre-mortem analysis

Imagining failure before it happens to identify and prevent potential problems.

Ask the AI to assume failure and work backward to identify risks. This is more effective than traditional risk assessment.

```
Imagine [project] failed completely after one year:
- What are the 5 most likely reasons it failed?
- What early warning signs would we have seen?
- What specific actions prevent each failure mode?
```

## Decision-making models

### Comparative advantage

The ability to perform a particular activity more efficiently than alternatives, even if not the absolute best at it.

When asking for recommendations, have the AI compare options based on relative strengths rather than absolute qualities. This reveals which choice excels in specific contexts.

```
Don't just rank these tools by overall quality.
Tell me what each tool is uniquely best at and when I should choose each one.
```

### Decision matrix

A systematic way to evaluate multiple options against weighted criteria.

Use this when the AI needs to compare complex alternatives with multiple factors.

```
Create a decision matrix for [decision]:
- List 3-5 key criteria and their importance weights
- Score each option on each criterion
- Which option has the highest weighted score?
- What does this reveal about the trade-offs?
```

### Margin of safety

Building in buffers to account for uncertainty and potential errors.

Ask the AI to include contingencies, backup plans, and confidence levels. This builds robustness into recommendations and acknowledges uncertainty.

```
Provide your recommendation plus:
- A backup plan if this fails
- Your confidence level (1-10)
- What could change your recommendation
```

### OODA loop

Observe, Orient, Decide, Act - a rapid decision-making cycle for dynamic situations.

Apply this for fast-moving situations requiring quick adaptation.

```
Apply OODA loop to [situation]:
- Observe: What's happening right now?
- Orient: How does this change our understanding?
- Decide: What's our best move given current conditions?
- Act: What's the immediate next step?
```

### Diversification

Spreading resources across multiple options to reduce exposure to any single risk.

For any strategy or approach, ask the AI to spread risk across multiple methods rather than betting everything on one approach.

```
Don't give me one perfect solution.
Give me 3-4 different approaches that work through different mechanisms,
so if one fails, the others still succeed.
```

### Force field analysis

A method for analyzing the forces supporting and opposing a proposed change.

Ask the AI to identify driving and restraining forces when evaluating any change or decision. This reveals what needs to be strengthened or weakened.

```
For [proposed change], map out:
- 3 forces pushing toward this change
- 3 forces resisting this change
- How to strengthen drivers and weaken resistors
```

## Creative and strategic thinking

### Blue Ocean strategy

Finding uncontested market spaces by creating new demand rather than competing in existing markets.

Ask the AI to identify unexplored opportunities rather than competitive improvements. This generates breakthrough thinking.

```
Identify Blue Ocean opportunities in [industry]:
- What customer needs are completely unmet?
- What would eliminate the need to choose between existing options?
- What new value could we create that doesn't exist today?
```

### SCAMPER technique

A creative thinking method using Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse.

Use SCAMPER to generate systematic creative alternatives when the AI needs to think beyond obvious solutions.

```
Apply SCAMPER to improve [product/service]:
- Substitute: What can be substituted?
- Combine: What can be combined?
- Adapt: What can be adapted from elsewhere?
- Modify: What can be magnified or minimized?
- Put to other uses: What other uses are possible?
- Eliminate: What can be removed?
- Reverse: What can be rearranged or reversed?
```

### Lateral thinking

Approaching problems from unexpected angles to generate creative solutions.

Ask the AI to make non-obvious connections and explore unconventional approaches.

```
Use lateral thinking for [problem]:
- What would someone from a completely different field do?
- What if we did the exact opposite of conventional wisdom?
- What random word or concept could inspire a solution?
```

### Six thinking hats

A method for exploring different perspectives: facts, emotions, caution, optimism, creativity, and process.

Structure AI analysis to systematically examine all angles of complex issues.

```
Analyze [issue] using six thinking hats:
- White hat: What facts do we know?
- Red hat: What do our emotions/intuition tell us?
- Black hat: What could go wrong?
- Yellow hat: What are the benefits and opportunities?
- Green hat: What creative alternatives exist?
- Blue hat: How should we approach this overall?
```

### Jobs-to-be-done

A framework focusing on what customers are really trying to accomplish when they use a product or service.

Frame product or service questions around the underlying job customers need done. This reveals true value propositions and improvement opportunities.

```
From the customer's perspective:
- What job are they really hiring [product/service] to do?
- What alternatives do they currently use for this job?
- What would make our solution dramatically better at this job?
```

## Human psychology and behavior

### Confirmation bias

The tendency to search for, interpret, and recall information that confirms our pre-existing beliefs.

Actively ask the AI to challenge your assumptions and seek disconfirming evidence.

```
I believe [position]. Help me stress-test this by:
- What evidence would prove me wrong?
- What are the strongest arguments against this position?
- What am I not considering that might change my view?
- Where might I be cherry-picking supportive evidence?
```

### Anchoring

Over-relying on the first piece of information encountered when making decisions.

Deliberately provide multiple starting points or ask the AI to generate alternatives before settling on an approach. This prevents fixation on the first solution.

```
Generate 5 completely different approaches to this problem first.
Don't anchor on any single solution - explore the full range.
Then evaluate which is actually best.
```

### Loss aversion

People's tendency to prefer avoiding losses over acquiring equivalent gains.

People hate losing things more than they like gaining equivalent value. Frame your prompts to highlight what people might lose by not acting.

```
Don't just show the benefits of this change.
What will people lose if they stick with the status quo?
What opportunities are slipping away right now?
```

### Social proof

People tend to follow the behavior of others, especially in uncertain situations.

When analyzing human behavior or designing solutions, consider how social dynamics influence decisions.

```
For [behavior/decision]:
- What social signals are influencing this choice?
- How does group behavior affect individual decisions here?
- What would happen if social proof pointed in a different direction?
- How can we leverage or counteract social proof effects?
```

### Survivorship bias

Focusing only on successful examples while ignoring failures that aren't visible.

Explicitly ask for both successful and failed examples when seeking insights. This reveals the full picture rather than cherry-picked success stories.

```
Show me companies that succeeded AND failed with this approach.
What separates the winners from the losers?
What patterns emerge from both groups?
```

### Status quo bias

Preferring things to stay the same by doing nothing or maintaining current decisions.

Challenge the AI to question existing approaches and consider radical alternatives. Force it to think beyond incremental improvements.

```
Assume our current approach is fundamentally broken.
If you had to completely reinvent this from scratch, what would you do?
Challenge every assumption we're making.
```

### Commitment and consistency bias

The desire to be and appear consistent with what we have already done or decided.

When people make commitments, they'll act consistently with them. Use this in prompts about behavior change or getting buy-in.

```
How can we get stakeholders to publicly commit to this approach?
What small initial commitments lead naturally to larger ones?
```

### Hyperbolic discounting

The tendency to prefer smaller immediate rewards over larger future rewards.

When the AI is evaluating trade-offs involving time, remind it that people heavily discount future benefits. Frame immediate benefits prominently.

```
Present this long-term strategy by emphasizing the immediate wins people will see in week 1.
How can we make future benefits feel more tangible today?
```

### Illusion of control

The tendency to overestimate our ability to control events and outcomes.

People overestimate their ability to control outcomes. When prompting about planning, ask the AI to identify what's actually controllable versus what isn't.

```
Separate this plan into:
- What we can directly control
- What we can influence but not control
- What is completely outside our influence
```

### Mere-exposure effect

A psychological phenomenon where people develop preferences for things they're familiar with.

Repeated exposure creates familiarity and preference. Use this when asking about communication strategies or adoption tactics.

```
How can we increase exposure to this idea without being pushy?
What's the minimum effective dose of repetition to build familiarity?
```

### Hanlon's razor

Never attribute to malice what can be adequately explained by stupidity or incompetence.

When analyzing problems involving people, ask the AI to consider simpler explanations before assuming bad intentions.

```
When [person/organization] did [problematic action]:
- What incompetence or misunderstanding could explain this?
- What systemic issues might have caused this outcome?
- What would we assume if we gave them the benefit of the doubt?
- When might malice actually be the better explanation?
```

### Narrative instinct

Humans are naturally drawn to stories and will create narratives to make sense of events.

Frame requests in story form and ask the AI to consider the narratives people tell themselves.

```
Create a narrative framework for [situation]:
- What story do the key players tell themselves about what's happening?
- How does this narrative influence their behavior?
- What alternative stories could we tell that might be more accurate?
- How can we craft a compelling narrative for our desired outcome?
```

### First-conclusion bias

The tendency to accept the first explanation that comes to mind and stop searching for alternatives.

Explicitly ask the AI to generate multiple explanations before settling on one.

```
For [problem/situation]:
- Generate 5 different possible explanations
- Don't let me settle on the first one that sounds reasonable
- What would I conclude if the obvious explanation were wrong?
- What alternative perspectives should I consider?
```

### Hindsight bias

The tendency to perceive past events as more predictable than they were at the time.

When analyzing past decisions, ask the AI to reconstruct what was knowable at the time.

```
Analyzing [past decision/event]:
- What information was actually available when this decision was made?
- What seemed uncertain or risky at the time?
- What would a reasonable person have concluded with only that information?
- How does knowing the outcome change how we view the original decision?
```

## Systems and complexity

### Feedback loops

Systems where outputs influence inputs, creating reinforcing or balancing cycles.

Ask the AI to identify feedback loops in any system you're analyzing, as they often drive unexpected behavior.

```
In [system/situation]:
- What feedback loops are operating here?
- Which loops are reinforcing (amplifying) and which are balancing?
- What happens if we strengthen or weaken these loops?
- What unintended feedback loops might our intervention create?
```

### Network effects

The phenomenon where a product or service becomes more valuable as more people use it.

The value increases as more people use something. When evaluating platforms, communities, or viral strategies, ask about network dynamics.

```
How does this become more valuable as more people participate?
What's the minimum viable network size for this to work?
How do we reach the tipping point?
```

### Economies of scale

Cost advantages that businesses obtain due to their scale of operation.

Larger operations become more efficient per unit. Use this when evaluating growth strategies or operational decisions.

```
At what scale does this approach become dramatically more efficient?
What are the fixed costs we need to spread across more units?
How does our cost structure change as we grow?
```

### Bottlenecks

The point in a system that limits overall performance, like the narrowest part of a bottle limiting flow.

Focus AI analysis on identifying and addressing the true constraints rather than optimizing non-limiting factors.

```
For [process/system]:
- Where is the bottleneck that limits overall performance?
- What happens if we optimize other parts while ignoring the bottleneck?
- How would addressing the bottleneck change the entire system?
- What would become the new bottleneck if we fixed the current one?
```

### Supply and demand

An economic model where price is determined by the relationship between availability and desire for a product.

Market dynamics determine pricing and availability. Apply this to any resource allocation or pricing question.

```
What drives demand for this solution?
How elastic is the demand - how much does price sensitivity matter?
What constraints limit supply?
```

### Incentive analysis

Understanding what motivates behavior and decision-making in individuals and organizations.

Ask the AI to analyze underlying motivations in any situation involving people or organizations. This reveals why things happen and how to influence them.

```
Before recommending solutions, map out:
- What incentives drive each stakeholder's behavior?
- How might these incentives create unintended consequences?
- How can we align everyone's incentives with our desired outcome?
```

### Game theory

The study of strategic decision-making between rational actors with competing interests.

Frame multi-party situations as strategic games to get better analysis of likely outcomes. This helps predict how different players will respond.

```
Analyze this as a strategic game:
- Who are the players and what do they each want?
- What moves can each player make?
- How will each player likely respond to our strategy?
```

## Communication and influence

### Signaling theory

How people communicate information through actions, especially when interests may conflict.

Ask the AI to consider what signals are being sent and received in communication scenarios. Actions often communicate more than words.

```
Analyze both the explicit message and implicit signals:
- What does this action communicate beyond its stated purpose?
- How might different audiences interpret these signals?
- What unintended messages might we be sending?
```

### Norm of reciprocity

The expectation that people will respond to positive actions with positive actions in return.

When crafting communications or negotiations, ask the AI to consider reciprocal dynamics. People feel obligated to return favors.

```
Design this interaction to leverage reciprocity:
- What value can we provide first, before asking for anything?
- How can we frame our request as mutual benefit?
- What would make them want to help us in return?
```

### Common knowledge

Information that is known by everyone in a group and everyone knows that everyone else knows it.

Information that everyone knows everyone else knows. Use this to understand shared assumptions and communication efficiency.

```
What can we assume everyone in this audience already knows?
What shared context can we build upon without explaining?
What "common knowledge" might actually not be common?
```

### Tribalism

The tendency for people to be loyal to their social group above all else.

People are loyal to their in-group above all else. Consider group identity when crafting messages or building communities.

```
How can we make our audience feel like insiders?
What shared identity or common enemy unites them?
How do we avoid triggering out-group resistance?
```

## Learning and adaptation

### Classical conditioning

A learning method where a neutral stimulus becomes associated with a natural response through repeated pairing.

Use this to understand how to create automatic responses or habits. When prompting about behavior change, ask the AI to identify triggers and rewards that can create desired patterns.

```
Design a habit formation system where [trigger] automatically leads to [desired behavior].
What rewards can reinforce this loop until it becomes automatic?
```

### Operant conditioning

A learning process where behaviors are modified by their consequences (rewards or punishments).

Behaviors followed by rewards increase, those followed by punishment decrease. Use this for habit formation and behavior modification prompts.

```
What immediate positive feedback can reinforce this behavior?
How can we make the reward feel connected to the action?
What negative consequences naturally discourage the wrong behavior?
```

### Normal distribution

A statistical concept where most values cluster around the average with fewer extreme cases.

Most outcomes cluster around the average with fewer extreme cases. Use this for risk assessment and expectation setting.

```
What's the most likely outcome here?
What's the range of probable results?
How should we prepare for the extreme cases on either end?
```

### Redundancy

The duplication of critical components to increase system reliability.

Critical systems need backups. Apply this to any important process or dependency.

```
What are the single points of failure in this approach?
How can we build in redundancy for the most critical components?
What backup systems do we need?
```

### Scarcity

The limited availability of a resource, which may increase its perceived value.

Limited availability increases perceived value. Use this in marketing, prioritization, and resource allocation contexts.

```
How can we highlight the limited nature of this opportunity?
What constraints create natural scarcity?
How do we communicate urgency without being manipulative?
```

## How to apply these models

**Combine multiple models**: The most effective prompts often weave together 2-3 models. For example, use backward chaining + margin of safety + incentive analysis for strategic planning prompts.

**Make model usage explicit**: Tell the AI which frameworks to use: "Apply game theory and loss aversion to analyze this competitive situation."

**Use models to check reasoning**: Ask the AI to explain its logic through specific model lenses to verify its thinking.

**Practice model recognition**: Learn to spot when mental models would improve your prompts rather than applying them randomly.

Mental models are thinking tools, not rigid rules. The key is conscious application based on your specific context and desired outcome.

---

*References: [30 mental models to add to your thinking toolbox](https://nesslabs.com/mental-models) and [Mental Models: The Best Way to Make Intelligent Decisions](https://fs.blog/%20mental%20models/)*
