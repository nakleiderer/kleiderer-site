const html = String.raw;

class Articles {
  data() {
    return {
      pagination: {
        data: "collections.article",
        size: 6,
        alias: "articles",
        filter: ["article"],
      },
      title: "All Articles",
      layout: "layouts/primary",
    };
  }

  render({ articles }) {
    return html`
      <section>
        <k-typography variant="h1">All Articles</k-typography>
        <k-grid>
          ${articles
            .map(
              (article) =>
                html`
                  <k-article-card
                    href="${article.url}"
                    title="${article.data.title}"
                    excerpt="${article.data.excerpt}"
                    date="${new Date(article.data.date).toISOString()}"
                  >
                  </k-article-card>
                `
            )
            .join("\n")}
        </k-grid>
      </section>
    `;
  }
}

module.exports = Articles;
