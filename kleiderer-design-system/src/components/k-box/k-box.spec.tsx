import { newSpecPage } from '@stencil/core/testing';
import { KBox } from './k-box';

describe('k-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KBox],
      html: `<k-box></k-box>`,
    });
    expect(page.root).toEqualHtml(`
      <k-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </k-box>
    `);
  });
});
