import { LitElement, css, html } from "lit-element";

const dateFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export class ArticleCard extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      excerpt: { type: String },
      date: { type: String },
      href: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([href]:hover) {
        background-color: white;
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

  relativeDateTime() {
    return new Date(this.date).toLocaleDateString(undefined, dateFormatOptions);
  }

  render() {
    const title = this.href
      ? html`<k-block-link href=${this.href}>${this.title}</k-block-link>`
      : this.title;

    return html`
      <k-card ?hoverable=${!!this.href}>
        <k-typography slot="header" variant="h5" el="h2">
          ${title}
        </k-typography>

        <k-typography slot="header" variant="h6" el="p">
          <time datetime=${this.date}>${this.relativeDateTime()}</time>
        </k-typography>

        <k-typography>${this.excerpt}</k-typography>
      </k-card>
    `;
  }
}
