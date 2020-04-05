const html = String.raw;

const numberOfRecentArticles = 3;

class Index {
  data() {
    return {
      title: "Home",
      layout: "layouts/primary",
    };
  }

  render({ collections }) {
    const safeArticles = Array(1).fill(collections.article[0]); //collections.article || [];
    const featuredArticles = safeArticles.slice(0, numberOfRecentArticles);
    const isEvenNumberOfArticles = featuredArticles.length % 2 === 0;
    const articles = isEvenNumberOfArticles
      ? featuredArticles.slice(0, -1)
      : featuredArticles;

    const finalRecentArticlesCard =
      articles.length < safeArticles.length
        ? html`<k-card hoverable center-content>
            <k-typography variant="h5" el="p">
              <k-block-link href="" target="_blank">
                View All Articles
              </k-block-link>
            </k-typography>
          </k-card>`
        : html`<k-card center-content>
            <k-typography variant="h5" el="p">
              Coming Soon
            </k-typography>
            <k-typography variant="h6" el="p">
              Check back later for more content.
            </k-typography>
          </k-card>`;

    return html`
      <section>
        <k-typography variant="h1">Recent Articles</k-typography>
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
          ${finalRecentArticlesCard}
        </k-grid>
      </section>
    `;
  }
}

module.exports = Index;
