---
layout: post
title: "On Mental Toughness (for Software Engineers): How the Best of the Best Get Better And Better"
author: "Derrick Stolee"
tags: [reading]
date: October 27, 2019
---

I was recently gifted _On Mental Toughness_, a collection
of ten Harvard Business Review articles reprinted as a
paperback. The first article,
["How the Best of the Best Get Better and Better" by Graham Jones](http://project12.circlespring.com/workshop1/R0806H-PDF-ENG.PDF),
takes advice
gathered from athletic achievement into business achievement.
Let's explore some of the ideas as they relate to
building software.

<!--more-->

> This post is part of a series where I try to take
> generic business articles and view them through my
> lens as an individual contributor software engineer.
>
> While the articles are usually focused on upper
> management roles, I believe there are many parallels
> with IC software engineers. Our profession is very
> intellectually demanding, there are always trade-offs
> in every choice we make, and our mistakes are likely
> to affect many people (customers or others in our
> organizations).

# Mental barriers

The article begins using the example of the
[four-minute mile](https://en.wikipedia.org/wiki/Four-minute_mile).
For decades, everyone publicly declared that running
a four-minute mile was impossible, until someone did it.
(This is very similar to the recent advances towards
a [two-hour marathon](https://en.wikipedia.org/wiki/Ineos_1:59_Challenge).)
After one person ran that fast, others quickly followed
suit. These days, some of the most elite high-school
runners can run a four-minute mile.

Some limits are in your mind, or are ingrained by
those around you.

What problems are you facing but not trying to overcome
because others' experience says it is impossible?

Don't forget to know what is a real limitation, and what
is not. Feel free to assume that an NP-Hard problem will
not have a polynomial-time algorithm. Instead, see if
your specific version of the problem can be solved using
heuristics, or the "slow" algorithm is actually fast for
you due to some bounded parameter.

**Example:** I remember working on counting the number
of perfect matchings in graphs. This is a well-known
P#-Complete problem (if you can solve this problem fast,
then you can count the number of solutions to 3-SAT fast,
too). Turns out that the reduction required to translate
3-SAT into a perfect matching problem requires an
exponential increase in the number of solutions. The
reason it is "hard" to count is because there are so
many! When focusing on graphs with a small number of
perfect matchings, the brute-force algorithm is quite
fast.

# Focus on your own excellence

To improve, you must focus on what you can control.

Don't compare yourself to others. **Their success is not
your failure.** I had to remind myself of that frequently
in graduate school, when I was first getting my bearings
in how to publish scholarly work. Other students (usually
from higher-ranking institutions) would publish more
papers in higher venues, and I would find my rate
inadequate. This led to a very stressful point in my
life, where I overworked myself more than ever.

What I realized (eventually) was that there will _always_
be someone who achieves more than me (or you) and from
the outside it will look like it was easy for them. This
is especially true when looking at an international field
of people. In grad school, journals came in every month
with authors from all over the world. Now, I see fantastic
people sharing their expertise and professional adventures
on Twitter. It's hard to avoid FOMO when presented with
the best view of someone's life.

By focusing on yourself, you can think about what you
can control, and what steps you can take to advance your
goals. Instead of seeing what others are doing, do the
thing that shows your talents the best. Success will
follow.

# Understand your own success

In order to focus on your own success, you must also
reflect and discover what had led to your current
level of success.

_If you are like me, then a lot of your success has
come from privilege. Recognize that, then find the
**next** reason for your success._

Jones mentions this in their section about celebrating
victories. While athletes spend time celebrating the
big wins, having a bit of fun is not the point of the
party. "The very best performers do not move on before
they have scrutinized and understood thoroughly the
factors underpinning their success," Jones writes.

If you have a big win, then take the time and enjoy
that win! While you are relaxed and happy, think back
on what choices you made to influence that success.

When building software, our view of the future can
be murky. We don't always know how difficult things
will be. Our code is exercised in situations we
never expected. We may be redirected from one
project to another, or the project changes significantly
one week to the next.

But we can always look back at what we have done.
Version control is great for this: you can literally
see everything you completed. With good commit
messages, you can remember the challenges you faced
and overcame. Can you also recall the different
options you could have pursued? The priorities you
could have set instead? What constellations aligned
this time to create your success? Hopefully, you
can look back to decisions you made based on
thoughtful preparation. You can repeat the success
by making those steps part of your daily process.

# Working with the best

While focusing on yourself is good, it always helps
to have a little bit of competition. Jones mentions
how rivals sometimes train together as a way for
each athlete to improve. By learning from each other,
the athletes each grow more than they could by
themselves. At the end of the day, they compete
against each other -- but also against a lot of others.

There are two things I gather from this idea:
have a great team, and work in the open.

Working with high-quality engineers makes everyone
on the team better. Code review spreads good habits
and spreads knowledge. Working with great people
is inspiring. This seems like an idea that is
widespread in the software industry.

This is the same when working on an open source
project, _especially with your competitors_. Git
is the backbone of most Git hosting providers:
GitHub, GitLab, BitBucket, etc. (NOT Azure Repos
or Gerrit). The Git client is used by all Git
users on their workstations, including most
engineers in Microsoft. The Git development
community is filled with engineers from all of
the companies that rely on Git, even though
they compete _directly_ in the space. By coming
together and being open about our goals, the
community thrives and everyone benefits.

Also, I never thought I'd learn so much minutia
about shell scripts that I do after working on
Git.

# How do you get better and better?

[Find me on Twitter](https://twitter.com/stolee) and
let me know!


