import { newSpecPage } from '@stencil/core/testing';
import { KTypography } from './k-typography';

describe('k-typography', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KTypography],
      html: `<k-typography></k-typography>`,
    });
    expect(page.root).toEqualHtml(`
      <k-typography>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </k-typography>
    `);
  });
});
