const html = String.raw;

const siteTitle = "Kleiderer";
const titleSeparator = " | ";
const hasValue = i => !!i;

class PrimaryLayout {
  render({ content, title }) {
    const pageTitle = [title, siteTitle].filter(hasValue).join(titleSeparator);

    return html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${pageTitle}</title>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossorigin
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rokkitt:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <header class="banner">
            <k-box class="banner" inset="l">
              <k-box inline="m">
                <img
                  alt="Photo of Nicolas Kleiderer"
                  src="/images/profile_photo.jpg"
                  width="48px"
                  height="48px"
                  class="u-shape-cricle"
                />
              </k-box>
              <a class="u-font-size-4 u-color-gray-80" href="/"
                >Nicolas Kleiderer</a
              >
            </k-box>
          </header>

          <main>
            <k-box inset-squish="l">
              ${content}
            </k-box>
          </main>

          <footer>
            <k-box inset="l">
              <p class="u-color-gray-70 u-font-size-small">
                &copy; ${new Date().getFullYear()} Nicolas Kleiderer. All rights
                reserved.
              </p>
            </k-box>
          </footer>
        </body>
      </html>
    `;
  }
}

module.exports = PrimaryLayout;
