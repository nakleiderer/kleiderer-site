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
    const classes = {
      "text": true,
      [this.variant]: true,
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
