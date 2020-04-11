import { newE2EPage } from '@stencil/core/testing';

describe('k-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<k-box></k-box>');

    const element = await page.find('k-box');
    expect(element).toHaveClass('hydrated');
  });
});
