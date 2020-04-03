const html = String.raw;

class NotFound {
  data() {
    return {
      title: "Not Found",
      layout: "layouts/primary",
      permalink: "404.html"
    };
  }

  render({ collections }) {
    const articles = collections.article || [];

    return html`
      <article>
        <h1>Not Found</h1>
        <p>Looks liks you stumbled into a dark corner of the internet.</p>
        <a href="/">Go Home</a>
      </article>
    `;
  }
}

module.exports = NotFound;
