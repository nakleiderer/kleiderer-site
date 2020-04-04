const html = String.raw;

class PrimaryLayout {
  data() {
    return {
      layout: "layouts/primary"
    };
  }

  render({ content, title, githubIssue }) {
    return html`
      <article class="LayoutArticle">
        <h1>${title}</h1>
        ${content}
        <h2>Share Your Thoughts</h2>
        <p>
          Have thoughts on this topic or feedback about this article?
          <a
            href="https://github.com/nakleiderer/kleiderer-site/issues/${githubIssue}"
            >Submit comments here</a
          >. Yes, you'll be required to use a GitHub account, but hopefully this
          will keep the crazies out and yield a more thoughtful and healthy
          discussion.
        </p>
        <p>
          Found a bug or a typo?
          <a href="https://github.com/nakleiderer/kleiderer-site"
            >Open a pull request</a
          >.
        </p>
      </article>
    `;
  }
}

module.exports = PrimaryLayout;
