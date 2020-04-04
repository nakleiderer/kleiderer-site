const html = String.raw;

class PrimaryLayout {
  data() {
    return {
      layout: "layouts/root"
    };
  }

  render({ content }) {
    return html`
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
