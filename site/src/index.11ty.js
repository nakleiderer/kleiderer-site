const html = String.raw;

class Index {
  data() {
    return {
      title: "Home",
      layout: "layouts/primary"
    };
  }

  render({ collections }) {
    const articles = collections.article || [];

    return html`
      <article class="u-section-copy">
        <h1>Recent Articles</h1>
        <ul>
          ${articles
            .map(
              article =>
                html`
                  <li><a href="${article.url}">${article.data.title}</a></li>
                `
            )
            .join("\n")}
        </ul>
      </article>
    `;
  }
}

module.exports = Index;
