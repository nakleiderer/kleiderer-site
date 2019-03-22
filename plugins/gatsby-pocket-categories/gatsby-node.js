const categoryNodes = []

const getCategoryIdsForPocketArticle = (allCategories, pocketArticle) => {
  const tagsOnArticle = pocketArticle.tags || []
  const categories = allCategories
    .filter(c => {
      const tagsInCategory = c.pocketTags || []
      return tagsOnArticle.reduce((acc, tagOnArticle) => {
        return tagsInCategory.includes(tagOnArticle) || acc
      }, false)
    })
    .map(c => c.id)
  return categories
}

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNode, createParentChildLink } = actions

  if (
    node.internal.type === 'ContentfulCategory' &&
    node.internal.owner === 'gatsby-source-contentful'
  ) {
    categoryNodes.push(node)
  }

  if (
    node.internal.type === 'PocketArticle' &&
    node.internal.owner === 'gatsby-source-pocket'
  ) {
    const children = getCategoryIdsForPocketArticle(categoryNodes, node)
    node[`categories___NODE`] = children
  }
}

exports.onCreateNode = onCreateNode
