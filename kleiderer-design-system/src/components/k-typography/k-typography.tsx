import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

const variantElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  button: "p",
  caption: "p",
  overline: "p"
};

@Component({
  tag: 'k-typography',
  styleUrl: 'k-typography.scss',
  shadow: true,
})
export class KTypography implements ComponentInterface {
  @Prop() variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline" = "body1";
  @Prop() measure: "m" | "l";
  @Prop() el: string | null = null;

  render() {
    const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(this.variant)
    const isSubtitle = ["subtitle1", "subtitle2"].includes(this.variant)
    const isBody = ["body1", "body2"].includes(this.variant)

    const isAlternate = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2"].includes(this.variant);

    const classes = {
      "text": true,
      "text--alternate": isAlternate,

      "heading": isHeading,
      "heading--1": this.variant === "h1",
      "heading--2": this.variant === "h2",
      "heading--3": this.variant === "h3",
      "heading--4": this.variant === "h4",
      "heading--5": this.variant === "h5",
      "heading--6": this.variant === "h6",

      "subtitle": isSubtitle,
      "subtitle--1": this.variant === "subtitle1",
      "subtitle--2": this.variant === "subtitle2",

      "body": isBody,
      "body--1": this.variant === "body1",
      "body--2": this.variant === "body2",

      "button": this.variant === "button",
      "caption": this.variant === "caption",
      "overline": this.variant === "overline",
      "measure-m": this.measure === "m",
      "measure-l": this.measure === "l",
    }

    const Element = !!this.el ? this.el : variantElementMap[this.variant]

    return (
      <Host>
        <Element class={classes}>
          <slot></slot>
        </Element>
      </Host >
    );
  }

}
