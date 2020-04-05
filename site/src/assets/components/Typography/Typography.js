import { LitElement, css, html } from "lit-element";

const elementHtmlMap = {
  p: (content) => html`<p>${content}</p>`,
  div: (content) => html`<div>${content}</div>`,
  span: (content) => html`<span>${content}</span>`,
  h1: (content) => html`<h1>${content}</h1>`,
  h2: (content) => html`<h2>${content}</h2>`,
  h3: (content) => html`<h3>${content}</h3>`,
  h4: (content) => html`<h4>${content}</h4>`,
  h5: (content) => html`<h5>${content}</h5>`,
  h6: (content) => html`<h6>${content}</h6>`,
};

const variantElementMap = {
  body1: elementHtmlMap.p,
  h1: elementHtmlMap.h1,
  h2: elementHtmlMap.h2,
  h3: elementHtmlMap.h3,
  h4: elementHtmlMap.h4,
  h5: elementHtmlMap.h5,
  h6: elementHtmlMap.h6,
};

export class Typography extends LitElement {
  static get properties() {
    return {
      el: { type: String },
      variant: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0 auto;
        line-height: var(--line-height);
        color: var(--color-gray-90);
        max-width: var(--measure-copy);
      }

      *,
      *:before,
      *:after {
        margin: 0;
        padding: 0;
        color: inherit;
        line-height: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-align: inherit;
        text-indent: inherit;
        width: 100%;
      }

      :host([variant="body1"]) {
        font-family: var(--font-family-primary);
        font-size: var(--font-size-1);
        font-weight: var(--font-weight-regular);
        text-align: justify;
        hyphens: auto;
        text-indent: 1rem;
      }

      :host([variant="h1"]) {
        font-family: var(--font-family-alternate);
        font-size: var(--font-size-6);
        font-weight: var(--font-weight-regular);
        text-align: center;
      }

      :host([variant="h2"]) {
        font-family: var(--font-family-alternate);
        font-size: var(--font-size-5);
        font-weight: var(--font-weight-regular);
        text-align: center;
      }

      :host([variant="h3"]) {
        font-family: var(--font-family-alternate);
        font-size: var(--font-size-4);
        font-weight: var(--font-weight-regular);
        text-align: center;
      }

      :host([variant="h4"]) {
        font-family: var(--font-family-alternate);
        font-size: var(--font-size-3);
        font-weight: var(--font-weight-semi-bold);
        text-align: center;
      }

      :host([variant="h5"]) {
        font-family: var(--font-family-alternate);
        font-size: var(--font-size-2);
        font-weight: var(--font-weight-semi-bold);
        text-align: center;
      }

      :host([variant="h6"]) {
        font-family: var(--font-family-alternate);
        font-size: var(--font-size-1);
        font-weight: var(--font-weight-semi-bold);
        text-align: center;
      }
    `;
  }

  constructor() {
    super();
    this.variant = "body1";
  }

  element() {
    if (!this.el) {
      return variantElementMap[this.variant];
    }

    return elementHtmlMap[this.el];
  }

  render() {
    const slot = html`<slot></slot>`;
    const element = this.element();
    return element(slot);
  }
}
