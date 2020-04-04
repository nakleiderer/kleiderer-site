const html = String.raw;

class NotFound {
  data() {
    return {
      title: "Not Found",
      layout: "layouts/primary",
      permalink: "404.html"
    };
  }

  render() {
    return html`
      <section class="u-section-copy u-center">
        <h1>Not Found</h1>
        <p>
          It looks like you stumbled <br />
          into a dark corner of the internet.
        </p>
        <a href="/">Go Home</a>
      </section>
    `;
  }
}

module.exports = NotFound;
