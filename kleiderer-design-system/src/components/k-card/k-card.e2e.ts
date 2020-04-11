import { newE2EPage } from '@stencil/core/testing';

describe('k-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<k-card></k-card>');

    const element = await page.find('k-card');
    expect(element).toHaveClass('hydrated');
  });
});
