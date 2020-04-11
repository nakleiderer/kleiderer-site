import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'k-card',
  styleUrl: 'k-card.scss',
  shadow: true,
})
export class KCard implements ComponentInterface {

  render() {
    return (
      <Host>
        <k-box el="article" inset="m">
          <k-box el="header" stack="l">
            <slot name="header">
              <k-box el="div" stack="s">
                <k-typography variant="overline" el="p">
                  <slot name="overline"></slot>
                </k-typography>
              </k-box>
              <k-typography variant="subtitle2" el="p">
                <slot name="title"></slot>
              </k-typography>
            </slot>
          </k-box>
          <k-box stack="l">
            <k-typography variant="body2">
              <slot></slot>
            </k-typography>
          </k-box>

          <k-box el="footer">footer</k-box>
        </k-box>
      </Host>
    );
  }

}
