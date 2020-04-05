import { LitElement, css, html } from "lit-element";

const dateFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export class Card extends LitElement {
  static get properties() {
    return {
      hoverable: { type: Boolean },
      centerContent: { type: Boolean, attribute: "center-content" },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        background-color: inherit;
        border-radius: 4px;
        padding: var(--spacing-m);
        border: solid 1px var(--color-gray-30);
      }

      :host([hoverable]:hover) {
        background-color: white;
      }

      :host([center-content]) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      <article>
        <header>
          <slot name="header"></slot>
        </header>

        <section>
          <slot></slot>
        </section>

        <footer>
          <slot name="footer"></slot>
        </footer>
      </article>
    `;
  }
}
