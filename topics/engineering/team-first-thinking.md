---
title: Team first thinking
description: Effective software delivery depends on building stable, small teams of five to nine people who own their code, foster trust, minimize cognitive load, and communicate clearly through defined team APIs.
date: 2022-08-15
github_id: zlatanpham
redirect:
  - /s/rD8MiQ
---

Modern-day software development is too complex and fast-paced to rely on individuals to comprehend all information needed to build and evolve software-rich systems, and research by Google on their own teams found that who is on the team matters less than the team dynamics; and that when it comes to measuring performance, teams matter more than individuals. In software development specifically, we must therefore start with the team for effective software delivery. There are multiple aspects to consider and nurture: team size, team lifespan, team relationships, and team cognition.

## Use "Team" as a standard

The term "team" has a specific meaning. When we use the word "team" here, we mean a stable group of from five to nine people who work together on a shared goal. A team is the smallest unit of delivery within an organization, so work should never be assigned to individuals; it should be assigned to teams. In all aspects of software design and delivery, we start with the team.

## Smaller size fosters trust

Teams and their subgroups are limited in size by the capacity of the human brain. In addition to Dunbar's number, anthropological research indicates that we can only have close relationships with a small number of people at any given time.

Teams must be able to trust one another to function effectively; however, when the size of a group grows too large for the necessary level of trust, that group's effectiveness deteriorates. It is therefore important for an organization to limit the size of a software development team to Dunbar’s number to ensure predictable behavior from that team. An effective team should have no more than five to eight people. (based on industry experience)

## The team owns the software

When multiple teams are allowed to make changes to the same system or subsystem, there is no single team responsible for either the changes made or the resulting mess. However, when a single team owns the system or subsystem and has the autonomy to plan its own work, then that team can make sensible decisions about short-term fixes while also removing dirty fixes in the next few weeks. Awareness of different time horizons helps a team care for the code more effectively.

## Team members need a team-first mindset

Effective teamwork depends on the members of a team putting the goals of their organization first, instead of focusing on their own personal needs. They should:

- Arrive for stand-ups and meetings on time.
- Keep discussions and investigations on track.
- Encourage a focus on team goals.
- Help unblock other team members before starting on new work.
- Mentor new or less experienced team members.
- Avoid “winning” arguments and, instead, agree to explore options.

## Embrace diversity in teams

In the context of changing requirements and technologies, teams must find creative ways to meet their objectives and communicate effectively with other teams. In a diverse environment, team members can learn from one another, which fosters less assumption-making about their users' needs.

## Minimize cognitive load

When establishing a team, organizations should also ensure that the [[Cognitive load | cognitive load]] of the software is not too high. A team working with high-cognitive load systems cannot effectively own or safely evolve the software.

For software delivery teams, a team-first approach to cognitive load means limiting the size of the software system that a team is expected to work with, and not overloading individual members of the team by giving them too many responsibilities at once.

## Define "Team APIs" that include code, documentation, and user experience

With stable, long-lived teams owning specific bits of the software systems, we can begin to build a stable team API: an API for interacting with each team. The team API includes:

- **Code**: runtime endpoints, libraries, clients, UI, etc. produced by the team
- **Versioning**: how the team communicates changes to its code and services (e.g., using semantic versioning [SemVer] as a “team promise” not to break things)
- **Wiki and documentation**: especially how-to guides for the software owned by the team
- **Practices and principles**: the team’s preferred ways of working
- **Communication**: the team’s approach to remote communication tools, such as chat tools and video conferencing
- **Work information**: what the team is working on now, what’s coming next, and overall priorities in the short to medium term
- **Other**: anything else that other teams need to use to interact with the team

## Facilitate team interactions for trust, awareness, and learning

It is important to provide time, space, and money to enable and encourage people from different teams with similar skills and expertise to share knowledge and develop their professional competencies.

Organizational structures that provide time and space for intercommunication and learning can lead to better team interactions. Two effective ways of facilitating this are: (1) a consciously designed physical and virtual environment; and (2) time away from desks at guilds, communities of practice (a group of people who regularly get together on a voluntary basis to collectively learn about a domain of interest), internal tech conferences, etc.

## Reference

- _Team Topologies: Organizing Business and Technology Teams for Fast Flow by Manuel Pais and Matthew Skelton_
