const { REGEX_FILE_EXT, FIELD_SLUG, FIELD_CATEGORIES, FIELD_POCKET_ARTICLE_DOMAIN_FAVICON, FIELD_POCKET_ARTICLE_FEATURED_IMAGE, FIELD_POCKET_ARTICLE_PUBLISHED_AT, TYPE_MARKDOWN_REMARK } = require("./lib/constants");
const { warn } = require("./lib/logging");
const { isArticleNode, isBookNode, isCategoryNode, isPocketArticle, isSoftwareNode } = require("./lib/isNode");

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

function fileNameToSlug(fileName) {
  return fileName.replace(REGEX_FILE_EXT, "")
}

function getCategoryIdsForPocketArticle(allCategories, node) {
  const tagsOnArticle = node.tags || []
  const categories = allCategories
    .filter(c => {
      const tagsInCategory = c.frontmatter.tags || []
      return tagsOnArticle.reduce((acc, tagOnArticle) => {
        return tagsInCategory.includes(tagOnArticle) || acc
      }, false)
    })
    .map(c => c.id)
  return categories
}

function getCategoryIdsForMarkdown(allCategories, node) {
  return allCategories.filter((c) => node.frontmatter.categories.includes(c.frontmatter.name)).map(n => n.id)
}

async function createRemoteImage(helpers, url) {
  const { actions, cache, createNodeId, store } = helpers;
  const { createNode } = actions

  if (!url) {
    warn(`createRemoteImage: No url specified`)
    return;
  };

  const remoteFileNode = await createRemoteFileNode({
    url,
    store,
    cache,
    createNode,
    createNodeId,
  })

  return remoteFileNode
}

async function hydrateMarkdownSlug(helpers) {
  const { actions, getNode, node } = helpers
  const { createNodeField } = actions

  if (!(isArticleNode(node) || isBookNode(node) || isCategoryNode(node))) return;

  const parent = getNode(node.parent)
  const slug = parent && parent.relativePath ? fileNameToSlug(parent.relativePath) : null;
  createNodeField({ node, name: FIELD_SLUG, value: slug })
}

async function hydrateArticleCategories(helpers, allCategories) {
  const { actions, node } = helpers
  const { createNodeField } = actions

  if (!isArticleNode(node)) return;

  const categories = getCategoryIdsForMarkdown(allCategories, node)
  createNodeField({ node, name: FIELD_CATEGORIES, value: categories })
}

async function hydrateBookCategories(helpers, allCategories) {
  const { actions, node } = helpers
  const { createNodeField } = actions

  if (!isBookNode(node)) return;

  const categories = getCategoryIdsForMarkdown(allCategories, node)
  createNodeField({ node, name: FIELD_CATEGORIES, value: categories })
}

async function hydratePocketArticleCategories(helpers, allCategories) {
  const { actions, node } = helpers
  const { createNodeField } = actions

  if (!isPocketArticle(node)) return;

  const categories = getCategoryIdsForPocketArticle(allCategories, node)
  createNodeField({ node, name: FIELD_CATEGORIES, value: categories })
}

async function hydrateSoftwareCategories(helpers, allCategories) {
  const { actions, node } = helpers
  const { createNodeField } = actions

  if (!isSoftwareNode(node)) return;

  const categories = getCategoryIdsForMarkdown(allCategories, node)
  createNodeField({ node, name: FIELD_CATEGORIES, value: categories })
}

async function hydratePocketArticleDomainFavicon(helpers) {
  const { actions, node, } = helpers;
  const { createNodeField } = actions;

  if (!isPocketArticle(node)) return;
  if (!(node.domainFavicon && node.domainFavicon.length)) return;

  const remoteFileNode = await createRemoteImage(helpers, node.domainFavicon)
  createNodeField({ node, name: FIELD_POCKET_ARTICLE_DOMAIN_FAVICON, value: remoteFileNode.id })
}

async function hydratePocketArticleFeaturedImage(helpers) {
  const { actions, node } = helpers;
  const { createNodeField } = actions;

  if (!isPocketArticle(node)) return;
  if (!(node.image && node.image.src && node.image.src.length)) return;

  const remoteFileNode = await createRemoteImage(helpers, node.image.src)
  createNodeField({ node, name: FIELD_POCKET_ARTICLE_FEATURED_IMAGE, value: remoteFileNode.id })
}

async function hydratePocketArticlePublishedAt(helpers) {
  const { actions, node } = helpers
  const { createNodeField } = actions

  if (!isPocketArticle(node)) return;

  const publishedAt = new Date(node.time_read * 1000).toISOString();
  createNodeField({ node, name: FIELD_POCKET_ARTICLE_PUBLISHED_AT, value: publishedAt })
}

async function onCreateNode(helpers) {
  const { getNodesByType } = helpers;

  const allMarkdownRemark = getNodesByType(TYPE_MARKDOWN_REMARK);
  const allCategories = allMarkdownRemark.filter(isCategoryNode);

  return Promise.all([
    hydrateArticleCategories(helpers, allCategories),
    hydrateBookCategories(helpers, allCategories),
    hydrateMarkdownSlug(helpers),
    hydratePocketArticleCategories(helpers, allCategories),
    hydratePocketArticleDomainFavicon(helpers),
    hydratePocketArticleFeaturedImage(helpers),
    hydratePocketArticlePublishedAt(helpers),
    hydrateSoftwareCategories(helpers, allCategories),
  ])
}

module.exports = {
  onCreateNode
}