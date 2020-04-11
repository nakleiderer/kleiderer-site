/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface KBox {
        "el": string | null;
        "inline": "s" | "m" | "l" | "xl" | "xxl";
        "inset": "s" | "m" | "l" | "xl" | "xxl";
        "insetSquish": "s" | "m" | "l" | "xl" | "xxl";
        "insetStretch": "s" | "m" | "l" | "xl" | "xxl";
        "stack": "s" | "m" | "l" | "xl" | "xxl";
    }
    interface KButton {
        "color": "primary" | "alternate";
    }
    interface KCard {
    }
    interface KTypography {
        "el": string | null;
        "measure": "m" | "l";
        "variant": "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline";
    }
}
declare global {
    interface HTMLKBoxElement extends Components.KBox, HTMLStencilElement {
    }
    var HTMLKBoxElement: {
        prototype: HTMLKBoxElement;
        new (): HTMLKBoxElement;
    };
    interface HTMLKButtonElement extends Components.KButton, HTMLStencilElement {
    }
    var HTMLKButtonElement: {
        prototype: HTMLKButtonElement;
        new (): HTMLKButtonElement;
    };
    interface HTMLKCardElement extends Components.KCard, HTMLStencilElement {
    }
    var HTMLKCardElement: {
        prototype: HTMLKCardElement;
        new (): HTMLKCardElement;
    };
    interface HTMLKTypographyElement extends Components.KTypography, HTMLStencilElement {
    }
    var HTMLKTypographyElement: {
        prototype: HTMLKTypographyElement;
        new (): HTMLKTypographyElement;
    };
    interface HTMLElementTagNameMap {
        "k-box": HTMLKBoxElement;
        "k-button": HTMLKButtonElement;
        "k-card": HTMLKCardElement;
        "k-typography": HTMLKTypographyElement;
    }
}
declare namespace LocalJSX {
    interface KBox {
        "el"?: string | null;
        "inline"?: "s" | "m" | "l" | "xl" | "xxl";
        "inset"?: "s" | "m" | "l" | "xl" | "xxl";
        "insetSquish"?: "s" | "m" | "l" | "xl" | "xxl";
        "insetStretch"?: "s" | "m" | "l" | "xl" | "xxl";
        "stack"?: "s" | "m" | "l" | "xl" | "xxl";
    }
    interface KButton {
        "color"?: "primary" | "alternate";
    }
    interface KCard {
    }
    interface KTypography {
        "el"?: string | null;
        "measure"?: "m" | "l";
        "variant"?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline";
    }
    interface IntrinsicElements {
        "k-box": KBox;
        "k-button": KButton;
        "k-card": KCard;
        "k-typography": KTypography;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "k-box": LocalJSX.KBox & JSXBase.HTMLAttributes<HTMLKBoxElement>;
            "k-button": LocalJSX.KButton & JSXBase.HTMLAttributes<HTMLKButtonElement>;
            "k-card": LocalJSX.KCard & JSXBase.HTMLAttributes<HTMLKCardElement>;
            "k-typography": LocalJSX.KTypography & JSXBase.HTMLAttributes<HTMLKTypographyElement>;
        }
    }
}
