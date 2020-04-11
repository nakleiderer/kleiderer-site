import { newSpecPage } from '@stencil/core/testing';
import { KCard } from './k-card';

describe('k-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KCard],
      html: `<k-card></k-card>`,
    });
    expect(page.root).toEqualHtml(`
      <k-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </k-card>
    `);
  });
});
