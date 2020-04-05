const html = String.raw;

class Index {
  data() {
    return {
      title: "Home",
      layout: "layouts/primary",
    };
  }

  render({ collections }) {
    const articles = collections.article || [];

    return html`
      <article class="u-section-copy">
        <h1>Recent Articles</h1>
        ${articles
          .map(
            (article) =>
              html`
                <k-card
                  href="${article.url}"
                  title="${article.data.title}"
                  excerpt="${article.data.excerpt}"
                  date="${new Date(article.data.date).toISOString()}"
                >
                </k-card>
              `
          )
          .join("\n")}
      </article>
    `;
  }
}

module.exports = Index;
