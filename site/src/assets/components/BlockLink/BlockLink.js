import { LitElement, css, html } from "lit-element";
import { spread } from "@open-wc/lit-helpers";

export class BlockLink extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      a::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `;
  }

  firstUpdated() {
    const observer = new MutationObserver(() => {
      this.requestUpdate();
    });

    observer.observe(this, { attributes: true });
  }

  render() {
    const attrs = Object.fromEntries(
      Array.from(this.attributes).map((v) => [v.name, v.value])
    );

    return html` <a ...=${spread(attrs)}><slot></slot></a>`;
  }
}
