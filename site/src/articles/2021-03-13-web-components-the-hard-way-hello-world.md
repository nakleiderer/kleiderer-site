---
title: "Web Components the Hard Way: Hello World"
description: Web components are a mature web technology that can be beneficial
  to many organizations.
githubDiscussionId: 734
permalink: articles/web-components/hello-world/
coverImg: /assets/images/articles/frustrated-developer.jpg
coverImgAlt: " "
date: 2021-03-13T15:38:36.039Z
---
Web components are a mature web technology that can be beneficial to many organizations. However, it can be quite difficult to find resources for building quality web components. In this guide, I will begin to alleviate this problem by showing you how to build the most basic web component. Future articles will explain the standards that make this possible and will build on this foundation to create more advanced components. For now, we'll focus on hello world.

# hello-world

Here's how to create a web component that renders a paragraph containing "Hello World."

```html
<hello-world></hello-world>
<script>
  window.customElements.define(
    "hello-world",
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = "<p>Hello World</p>";
      }
    }
  );
</script>
```

## Naming

According to the [WHATWG HTML specification](https://html.spec.whatwg.org/#valid-custom-element-name), a Custom Element name must:

* Start with a lowercase ASCII character; and,
* Must not contain any uppercase ASCII characters; and,
* Must contain a hyphen, but not end with a hyphen; and,
* Must not conflict with existing HTML, SVG, or MathML tag names:

  * annotation-xml
  * color-profile
  * font-face
  * font-face-src
  * font-face-uri
  * font-face-format
  * font-face-name
  * missing-glyph

Good: `hello-world`
Good: `x-helloworld`
Good: `x-🌎`
Bad: `helloworld`
Bad: `X-helloworld`
Bad: `helloworld-`
Bad: `x-helloWorld`

## Extending HTMLElement

* Autonomous components must extend HTMLElement
* There's also customized built-in components, but browser support is bad

```javascript
class extends HTMLElement { }
```

## Calling Super

* Always call super first

```javascript
super();
```

## Attaching Shadow Root

* Open vs. closed
* Do this in the constructor

```javascript
this.attachShadow({ mode: "open" });
```

## Setting Inner HTML

* Not accessible from outside the shadow root
* Do this in the constructor, along with any other elements it creates