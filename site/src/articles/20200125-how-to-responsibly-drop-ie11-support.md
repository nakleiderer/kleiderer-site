---
layout: layouts/article
title: Ditch Internet Explorer Without Ditching Customers
excerpt: Supporting legacy browsers takes a significant amount of Engineering resources, but dropping support incorrectly can incur some risks. By understanding your clients and making efforts to minimize the impact of dropping support, both business owners and web developers can breathe a sigh of relief.
tags: article
date: 2020-01-25T00:00:00-0600
githubIssue: 349
permalink: "articles/ditch-ie-without-ditching-customers/"
---

Supporting legacy browsers takes a significant amount of Engineering resources. With [less than 3%](https://gs.statcounter.com/browser-market-share) of global browser market share attributable to IE11, it hardly makes sense to support it with feature-parity by default. Most web developers desire to completely drop support for legacy browsers, including IE11, but we have to address the business impact of those changes. By understanding your clients and making efforts to minimize the impact of dropping support, both business owners and web developers can breathe a sigh of relief.

## Instrument Pages with Analytics

Before you get started on your journey to supporting _only_ modern browsers, you need to understand your current audience. Make sure you have data-driven answers to the following questions:

1. What percentage of unique page views come from users of legacy browsers?
1. What percentage of unique page views come form users of modern browsers?

### "Why unique page views?"

In general, we're not interested in the one IE11 power user who's crawled your entire site a thousand times; we're interested in the business opportunity represented by the statistic. By dropping support for that one power user, you've _potentially_ lost one customer, regardless of how many times they have visited your site. If your business revenue correlates more with non-unique page views, then you should adjust the above questions accordingly.

### "But two percent of my users are on a legacy browser."

Well, that may be the case, but don't fall victim to the fallacy of correlation vs. causation. Two percent of users does not mean two percent revenue loss. Just because 2% of your users are using an outdated browser today, doesn't mean that 2% of them will be there tomorrow.

On one hand, those users may be able to easily switch browsers:

- Maybe they have multiple browsers installed but accidentally opened the legacy browser.
- Maybe they don't know that their browser selection affects their user experience, and they will switch once they are informed.

On the other, those users may be locked into using the browser:

- Maybe they have a very restricted IT department, and they don't allow modern browsers.
- Maybe they are under strict regulatory oversight, and cannot use a different browser.

The point here is that _you don't know_ from the page view data how much is at stake, but you likely know the _maximum_ business risk.

## Encourage Users to Switch Browsers

Now that you have a statistical baseline, it's time to start experimenting with ways to encourage users to switch their default browser. Exactly how you accomplish this depends on your brand and your audience.

Though outdated browsers are indeed security risks, it's likely best to _avoid_ fear-mongering statements like:

> Your browser is insecure! Switch now to protect your privacy!

Instead, paint a picture to the customer about how things will be better for them if they switch:

> Want a faster experience? Switch to a modern browser to speed up your experience.

> You're experiencing a limited version of this site. Switch to a modern browser for a full experience.

You can even highlight missing features on your page due to older browser:

> New! This section now features an improved editing experience. Upgrade your browser for the new experience.

The point of these messages is to overcome unconscious ignorance. Your users should be aware that they are missing out on a better experience and let them make a conscious choice to upgrade or stay with their current browser. Ideally, these messages will accelerate your users' adoption of a modern browser, resulting in lower business risk for dropping legacy browser support.

Another goal here is to open up customer feedback regarding your browser support. Encourage clients to contact your customer success representatives if they have issues upgrading. This will open a feedback loop informing you if your target audience is locked into a particular browser.

## Build with Modern Features

As long as your target audience is not inherently locked into using a legacy browser, you should feel free to build with modern web platform features.

Default to progressive enhancement techniques. Legacy browsers should at least have a read-only, text-based, and navigable version of your application.

If the value proposition of your application is significantly diminished by the lack of a particular feature and you have a large percentage of legacy users, consider using transpilation or polyfills to support the feature in legacy browsers. However, do not punish modern users for the sake of supporting legacy browsers. Don't make modern browsers download all the extra code generated by your transpilation or polyfills. Use differential serving techniques to ship _only_ modern code to modern browsers.

Remember, the goal is _not_ to provide the _same_ experience across browsers. The goal is to provide a minimally-valuable experience to legacy browsers and an optimal experience to modern browsers. This is acceptable because you are informing users of their degraded experience.

Listen to your customers. Don't just default to polyfilling a feature. Consider letting them tell you that the feature is important to them. Again, this feedback is critical to understanding your audience

## Officially Drop Your Support

Over time, you should see your percentage of legacy browser users drop off. You've accelerated that drop by informing your users and encouraging their adoption of modern browsers. By this point, you've significantly reduced or eliminated the business risk of dropping your legacy browser support.

It's time to celebrate by doing what some developers love most: deleting code.

If your supported browsers all contain a feature that you've polyfilled, remove the polyfill. You should only polyfill if you're using a feature with partial implementation across your supported browsers (and use feature detection to load it).

If all of your supported browsers support the language features you've adopted, remove the transpilation of those features.

Keep your feature detection code though. When you detect a user is missing features that all supported browsers contain, you should still encourage the user to update. This should happen less often since most modern browsers are kept up-to-date.

## Acknowledgements

- Cover photo by [Sebastian Herrmann](https://unsplash.com/@officestock?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/frustration?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
- Browser usage statistics from [StatCounter Global Stats - Browser Market Share](https://gs.statcounter.com/browser-market-share)
