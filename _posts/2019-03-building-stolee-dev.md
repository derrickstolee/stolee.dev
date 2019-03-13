---
layout: post
title: "Building stolee.dev"
author: "Derrick Stolee"
tags: [web]
date: March 4, 2019
---

Welcome to [stolee.dev](https://stolee.dev)! This is my
personal blog, not to be confused with blog articles I
write for my job.

In this post, I'll discuss some things I learned while
building this page, and share links to the sources I
used.

<!--more-->

# Connecting a .dev domain to GitHub Pages

I hadn't purchased a domain in fifteen years, so when
[Google announced the `.dev` domain](https://www.blog.google/technology/developers/hello-dev/),
I thought it would be a good time to try it again. I've
been using GitHub Pages for some side projects, so I
wanted to use that for easy hosting. But I hadn't set
up a custom domain yet.

To set up a custom domain, I used Luis L's
[How to set up Github Pages with Google domains](https://medium.com/@Tnylnc/tnylnc-how-to-set-up-github-pages-with-google-domains-83bd5a4fbc5c).
Of course, I made some mistakes and was a bit impatient
waiting for the changes in Google Domains to propagate
to GitHub Page's tools.

# Mobile-friendly rendering

I got started with HTML in 2001, and gave up all desire
to make web pages by 2007, so I missed the mobile boom.
After desigining a simple layout using my desktop browser,
I tried looking at the page on my phone and it was _awful_.
Instead of nicely rendering the font at a readable size, it
was zoomed way out and tiny.

This turns out to be a trick phone browsers use to display
web pages that have _not_ been optimized for mobile. The
simple way to get around this behavior is to add the
following tag to the `<head>` of your page:

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

[You can learn more about the viewport on Mozilla's web docs](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag).

# Text-friendly rendering

Since I'm used to working with the Git mailing list,
I've grown fond of old-school approaches to things.
Making the page useful for text-based browsers was
one thing I really wanted to ensure was that
text-based browsers could read the page as close to
the original rendering as possible. Here is how it
looks:

![How it looks in lynx](https://stolee.dev/img/text-render.png)

Of course, the home page is super-simple, so this is
not a surprise. The entire page is mostly a collection
of unordered lists (`<ul>` tags) with some simple CSS
to style different parts. The most interesting part is
that the navigation menu for the different sections has
a horizontal list, even though it is a `<ul>` tag.

Hopefully, this focus on text-based visibility also
ensures anyone with a visual impairment can read the page.
Please let me know if you have any trouble!

# Jekyll-enabled blogging

Since this page is deployed and hosted by GitHub pages,
it is by necessity a static site. However, we can get
a bit creative to automatically generate a blog feed based
on a list of markdown files using Jekyll.

Here is my `_config.yml` file:

```
name: Stolee's Dev Blog
description: The personal developer blog of Derrick Stolee
url: https://stolee.dev/blog
plugins:
  - jekyll-feed
theme: minima
permalink: /posts/:year/:month/:title
feed_items: 10
feed_update_period: daily
feed_update_frequency: 1
```

Then, I have my posts written in markdown in the
`_posts` folder automatically generate HTML pages
for each article, an [RSS feed](https://stolee.dev/feed.xml),
and [an HTML index of posts](https://stolee.dev/blog/).

I'm sure there are ways to make this more fancy, but this
suits me well for now.