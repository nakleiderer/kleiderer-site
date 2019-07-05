module.exports = {
    PLUGIN_NAME: require('../package.json').name,

    TYPE_POCKET_ARTICLE: "PocketArticle",
    OWNER_POCKET_ARTICLE: "gatsby-source-pocket",

    TYPE_MARKDOWN_REMARK: "MarkdownRemark",
    OWNER_MARKDOWN_REMARK: "gatsby-transformer-remark",

    TEMPLATE_KEY_ARTICLE: "article",
    TEMPLATE_KEY_BOOK: "book",
    TEMPLATE_KEY_CATEGORY: "category",
    TEMPLATE_KEY_SOFTWARE: "software",

    FIELD_CATEGORIES: "categories___NODE",
    FIELD_SLUG: "slug",
    FIELD_POCKET_ARTICLE_DOMAIN_FAVICON: "domainFavicon___NODE",
    FIELD_POCKET_ARTICLE_FEATURED_IMAGE: "featuredImage___NODE",
    FIELD_POCKET_ARTICLE_PUBLISHED_AT: "publishedAt",

    REGEX_FILE_EXT: /\.[^/.]+$/,
}
