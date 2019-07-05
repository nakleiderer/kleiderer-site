const { TYPE_MARKDOWN_REMARK, OWNER_MARKDOWN_REMARK, TEMPLATE_KEY_CATEGORY, TEMPLATE_KEY_ARTICLE, TEMPLATE_KEY_BOOK, TEMPLATE_KEY_SOFTWARE, TYPE_POCKET_ARTICLE, OWNER_POCKET_ARTICLE } = require("./constants");

function isNodeOfTypeWithOwner(node, type, owner) {
  return node.internal.type === type &&
    node.internal.owner === owner;
}

function isNodeWithTemplateKey(node, templateKey) {
  return node.frontmatter && node.frontmatter.templateKey && node.frontmatter.templateKey === templateKey;
}

function isMarkdownNode(node) {
  return isNodeOfTypeWithOwner(node, TYPE_MARKDOWN_REMARK, OWNER_MARKDOWN_REMARK);
}

function isMarkdownNodeWithTemplateKey(node, templateKey) {
  return isMarkdownNode(node) && isNodeWithTemplateKey(node, templateKey);
}

function isCategoryNode(node) {
  return isMarkdownNodeWithTemplateKey(node, TEMPLATE_KEY_CATEGORY);
}

function isArticleNode(node) {
  return isMarkdownNodeWithTemplateKey(node, TEMPLATE_KEY_ARTICLE);
}

function isBookNode(node) {
  return isMarkdownNodeWithTemplateKey(node, TEMPLATE_KEY_BOOK);
}

function isPocketArticle(node) {
  return isNodeOfTypeWithOwner(node, TYPE_POCKET_ARTICLE, OWNER_POCKET_ARTICLE);
}

function isSoftwareNode(node) {
  return isMarkdownNodeWithTemplateKey(node, TEMPLATE_KEY_SOFTWARE);
}

module.exports = {
  isArticleNode,
  isBookNode,
  isCategoryNode,
  isPocketArticle,
  isSoftwareNode,
}
