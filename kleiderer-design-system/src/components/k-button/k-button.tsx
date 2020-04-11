import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'k-button',
  styleUrl: 'k-button.scss',
  shadow: false,
})
export class KButton implements ComponentInterface {

  @Prop() color: "primary" | "alternate" = "primary";

  render() {
    const classes = {
      "k-space-inset-squish-m": true,
      [this.color]: true,
    }

    return (
      <Host class={this.color}>
        <button class={classes}>
          <k-typography variant="button"><slot></slot></k-typography>
        </button>
      </Host>
    );
  }

}
