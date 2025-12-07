---
layout: post
title: "Communicating in Pull Requests"
author: "Derrick Stolee"
tags: [software engineering, git, pull requests, collaboration]
date: December 19, 2025
---

Most software projects gate new contributions by a code review step, and
that's normally done by pull requests (or equivalently, merge requests).

Projects may also set up additional technical requirements, such as
building and testing the code, performing static style checks, or
even scanning the diff with a generative AI code review bot.

With all of these automated processes, it's more important than ever to
focus on the _primary purpose_ of pull requests:

> **The main purpose of pull requests is to communicate with the other
> humans interacting with the project.**

Many contributors erroneously assume that the purpose of pull requests
is to avoid bugs or regressions. While that's important, we avoid
regressions by having a robust test suite that is checked before merging.
While sometimes humans can catch bugs, they are incredibly fallible. I
personally believe that _code is easier to write than it is to read_, so
how can I expect a reviewer to catch something that I didn't while
writing, building, and running the code locally?

_consider structure and goals..._

* _Every code change has risk; is the risk/reward ratio correct?_
* _Every code change interrupts the (incomplete) mental model of other engineers.
  Can you help improve their mental model during this change?_
* _Most obvious: help your team review_
* _Less obvious: help your self-review_
* _least obvious: help your future self_
* _PR dwell time_

# A tale of two pull requests

_create screenshots of a fake PR with the same code diff, such as a
package version update, and one has no details at all while another has
a careful detail of why the package needs updating, how it's being used,
when and how this change will impact customers, testing needed or not,
work item linking, related pull request linking._

## Opportunities for communication

_describe several ways that we can communicate..._

* Pull request title, description, tags...
  - Title can have `[Topic]` or `Topic:` starts to group together.
  - Description can be based on a template or free-form. Should have a
    free-form area for special cases not covered by a template.
  - The state of the PR may also be important. Is it a draft that is
    looking for high-level feedback and not a full review? Are there
    tags about impacted areas? Is it urgent for deadlines, hotfixing,
    or security reasons?
  - Keep in mind that title and discussion will impact the resulting
    commit message, but many other things will not be included.
* Linked items
  - Is this work related to a tracked work item or issue? Is it part of
    the work, or does it fully resolve the issue?
  - Are there related pull requests that come before or after?
* Pull request discussion...
  - Can pre-load discussion with requests for what reviewers should
    focus on.
  - You can use emoji to indicate "I've applied this advice locally"
    while waiting to resolve a comment until you've pushed a change that
    has the full reaction.
* Communication outside of the pull request
  - Email, teams, chatting in hallways, pairing sessions... these are
    all important ways to communicate about a code review informally,
    but "if it's not in the PR, then it didn't happen". the pull request
    review sequence itself is an important historical record of its own
    that may need to be referenced in the future. (_example why?_)

# What we owe to each other

_step 1: agree as a team about what you think is important that you want
to see in pull request._

_here are some ideas:_

* What kind of change is this? A refactoring? A new feature? A bugfix?
* What kind of testing was done? Manual testing? New regression tests?
  Or: is testing particularly difficult and our only known mechanism to
  test is to deploy to production? (Keep an eye out for these to inform
  your backlog of technical debt.)
* How will this impact production? What monitors or alerts would fire if
  this goes poorly? What metrics will positively indicate that the
  change is working as intended?
* When will this change be deployed, and how? Is it going out in the
  next binary deployment with immediate effect? Is it waiting for the
  next release branch? Is it a binary deployment change or is it gated
  by a feature flag or special configuration?

_here are some less common ideas, but when they are relevant, they can
lead to interesting discussions about the overall project at a level
above the current change:_

* What alternative approaches were considered? Do you have branches
  that show those prototypes? Why were those approaches rejected and
  this approach chosen?

* What was difficult about making this change? Is there technical debt
  that made this more complicated than it should have been, and thus we
  should track this as justification to pay down that debt?

* What was difficult about testing this change? Are there concerns
  around special cases, operating at scale or under load? How does your
  deployment plan include strategies to safely learn more as this change
  rolls out to real use?

_Keep in mind that some of these questions may be answered similarly in
many "regular" changes. Consider creating runbooks for certain types of
changes and then point to those runbooks if the change fits that
scenario perfectly. We don't need to reinvent the wheel, but we do need
to know that there is prior art._

_Another main goal here is to help junior engineers or engineers who are
new to the project to understand these changes. I personally find it
extremely valuable to learn about a project by watching what others are
doing to change it. But if they don't overcommunicate the context, then
I'm lost and need to work even harder (or interrupt the contributor with
questions) to find that context. If you just wrote the code, then you
already have this context in your head! Externalize it to help everyone
else catch up._

This concept of _overcommunicating the context_ is important for
contributors of all levels. Newer contributors should overcommunicate
their understanding so more experienced contributors can double-check
that understanding against their experience. Experienced contributors
should overcommunicate their understanding as that will expand the
knowledge of the newer contributors.

# Help yourself, help others

In the previous section, I focused on questions that you can answer in
order to help the reviewers better understand the full context of your
change instead of moving directly to file diffs. What's particularly
interesting about going through this effort is that you can use these
questions or templates to _self-review_ and find things that you had
missed when deep in the thick of making the change.

This is not hypothetical. A few years ago, I was working to create a
template for a "production change record" document that was intended to
communicate how a new feature would roll out, potentially across
multiple pull requests changing multiple services. After I wrote this
"meta change" template based on my own expertise, I immediately applied
the template to a change that I had under code review.

**When I applied my own template to my own change, I found things that
I had missed when preparing the change!**

Humans are fallible. We have limited working memory in our brains. We
need strategies to externalize information to assist with recall from
long-term memory. I found that externalizing my own experiences into a
checklist of questions led to an improved outcome for changes I was
making. I'm confident that this will help most software engineers, too.

# Future you thanks you

Software products are not static things, but are constantly changing.
Even projects that have little code change are impacted by a changing
environment, changing user behavior, or any number of external
variables. As things change, _things will go wrong_. How do you react
to these incidents?

In most cases, teams share the load of supporting a project by
rotating who is responsible for front-line support. This will frequently
mean that the person driving the investigation is not the person who
wrote the code that is misbehaving or needs updating. Even if the person
responding to the incident wrote the code that is misbehaving, memory is
fallible over time and the context of the change can be hard to
remember.

In this way, carefully communicating your change in the pull request can
help all engineers be better prepared to support an issue in this space,
_including your future self_!

Keep in mind that the pull request title and description will be stored
as the commit message, so if you are using `git log` to find recent
changes in a section of code, then you can automatically load that
necessary context. The title will frequently point to the pull request
by number, so you can load the discussion to see if there are any other
hints of what may have been tricky here.

Outside of the history, you may also need to look at the related work
items or issues to see if they had any other related work that is
involved. This linking process can help point to a different area that
was changed in reaction to this, or similar problems.

# The robots can sometimes help, but also need help

Generative AI tools are getting really good at describing a code change.
It is natural to think that we could rely on those tools to do all of
this for us.

There are some limitations:

* AI summaries are frequently in the pull request metadata, but not
  actually committed to the commit message.

* AI summaries are based on the diff presented, and can only describe
  the change based on that context. They can't talk about alternatives
  that you tried and rejected. They typically can't describe the larger
  context of how this change will impact the larger project, especially
  around when and how it will be deployed.

* With proper prompting, AI tools could look for risk factors or
  improved test coverage. While these could be factored in via a custom
  build policy that runs custom prompting, the best time to ask AI for
  these types of things is during development and doing a careful
  evaluation of those outputs while the change is in your working
  memory.

In general, generative AI tools are doing pattern matching from previous
work done by humans. Consider that their generated descriptions could be
based on poor descriptions, leading to _garbage in, garbage out_.

As you do your work, you are naturallly creating the data set for the
next generation of generative AI tooling. Be part of improving those
tools!

# How to put this in action

* Meet with your team and do a blameless retrospective of review
  process. Consider pull requests that were communicated well, or not
  well. Do you have recent changes that caused issues as they deployed?
  What could have been done in the pull request communication to avoid
  this? Create guidelines for your minimum standards of communication.
  Create guidelines for when you should go above and beyond.

* Consider your project on a technical basis and discover where some
  common patterns are repeated and thus could be externalized to
  runbooks that can be referenced instead of repeated. When using these
  runbooks, what questions are still important to be answered in each
  situation?

* Consider the seniority of your team. How many engineers do you have of
  differing levels of expertise? How often are you training newer
  engineers in this space? Do you have an external operations team that
  is the first line of support and may need to react to issues in your
  domain?

* Create templates. Review those templates as a team before committing
  them to the repo. Hold each other accountable to following the
  templates.
  
* Schedule time to revisit all of these thoughts after experimenting
  with the new standards for a while (1 month, 3 months, 1 year?). You
  will always learn new things that can help expand or contract the
  templates.

* Watch team statistics:
  - PR dwell time.
  - Feature delivery and backlog burndown rate.
  - Incident rate.
  - Incident response time.
  - "thriving"?

# Advanced strategies

* Commit messages
* Stacked pull requests
* Hotfixes

# What else should I read about this?

* Write Better Commits, Create Better Projects
* Git contribution guidelines
...