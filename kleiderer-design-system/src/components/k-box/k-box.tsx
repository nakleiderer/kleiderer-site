import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'k-box',
  styleUrl: 'k-box.scss',
  shadow: true,
})
export class KBox implements ComponentInterface {
  @Prop() inline: "s" | "m" | "l" | "xl" | "xxl";
  @Prop() stack: "s" | "m" | "l" | "xl" | "xxl";
  @Prop() inset: "s" | "m" | "l" | "xl" | "xxl";
  @Prop() insetSquish: "s" | "m" | "l" | "xl" | "xxl";
  @Prop() insetStretch: "s" | "m" | "l" | "xl" | "xxl";
  @Prop() el: string | null = null;

  render() {
    const classes = {
      [`spacing-inline-${this.inline}`]: !!this.inline,
      [`spacing-stack-${this.stack}`]: !!this.stack,
      [`spacing-inset-${this.inset}`]: !!this.inset,
      [`spacing-inset-squish-${this.insetSquish}`]: !!this.insetSquish,
      [`spacing-inset-stretch-${this.insetStretch}`]: !!this.insetStretch,
    }

    const Element = !!this.el ? this.el : "div"

    return (
      <Host>
        <Element class={classes}>
          <slot></slot>
        </Element>
      </Host>
    );
  }

}
