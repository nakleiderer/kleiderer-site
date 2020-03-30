const html = String.raw;

class Index {
  data() {
    return {
      title: "Home",
      layout: "layouts/primary"
    };
  }

  render({ collections }) {
    return html`
      <article>
        <h1>Recent Articles</h1>
        <ul>
          ${collections.article
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
