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
            href="https://fonts.googleapis.com/css2?family=Rokkitt:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
          <link rel="stylesheet" type="text/css" href="/css/index.css" />
        </head>
        <body>
          <header class="banner" p="3">
            <img
              src="https://avatars0.githubusercontent.com/u/4278631?s=460&u=f12f7d1133458d3adb66d5802495c9f819206af1&v=4"
              width="48px"
              height="48px"
              class="u-shape-cricle"
              mr="2"
            />
            <a href="/">Nicolas Kleiderer</a>
          </header>

          <main>
            ${content}
          </main>

          <footer p="3">
            <p>
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