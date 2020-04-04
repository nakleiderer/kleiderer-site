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
        <body class="LayoutPrimary">
          <header class="LayoutPrimary-header">
            <img
              alt="Photo of Nicolas Kleiderer"
              src="/images/profile_photo.jpg"
              class="LayoutPrimary-logo"
              width="48px"
              height="48px"
            />
            <a class="u-font-size-4 u-color-gray-80" href="/"
              >Nicolas Kleiderer</a
            >
          </header>

          <main class="LayoutPrimary-content">
            ${content}
          </main>

          <footer class="LayoutPrimary-footer">
            <p class="LayoutPrimary-copyright">
              &copy; ${new Date().getFullYear()} Nicolas Kleiderer. All rights
              reserved.
            </p>
          </footer>
        </body>
      </html>
    `;
  }
}

module.exports = PrimaryLayout;
