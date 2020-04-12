import * as internal from "/node_modules/elix/src/base/internal.js";
import html from "/node_modules/elix/src/core/html.js";
import ReactiveElement from "/node_modules/elix/src/core/ReactiveElement.js"; // eslint-disable-line no-unused-vars
import * as template from "/node_modules/elix/src/core/template.js";

/**
 * Button styles in the Plain reference design system
 *
 * @module ButtonMixin
 * @param {Constructor<ReactiveElement>} Base
 */
export function ButtonMixin(Base) {
  return class PlainButton extends Base {
    get [internal.template]() {
      const result = super[internal.template];
      result.content.append(html`
        <style>
          :host([disabled]) {
            color: gray;
          }

          :host([variant="alternate"]) > [part~="inner"] {
            background-color: red;
          }

          [part~="inner"] {
            display: inline-flex;
            justify-content: center;
            margin: 0;
            position: relative;
          }
        </style>
      `);
      return result;
    }

    [internal.render](changed) {
      super[internal.render](changed);
      template.replace(
        this[internal.ids].inner.querySelector("slot"),
        html`<k-typography variant="h6" el="span"><slot></slot></k-typography></button>`
      );
    }
  };
}
