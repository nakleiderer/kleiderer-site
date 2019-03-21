const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const get = require('lodash/get')

const addRemoteImageToNode = async ({
  url,
  node,
  fieldName,
  store,
  cache,
  createNode,
  createNodeId,
}) => {
  const fileNode = await createRemoteFileNode({
    url,
    store,
    cache,
    createNode,
    createNodeId,
  })
  // Adds a field `localImage` or custom name to the node
  // ___NODE appendix tells Gatsby that this field will link to another node
  if (fileNode) {
    node[`${fieldName}___NODE`] = fileNode.id
  }
}

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNode } = actions
  if (node.internal.type === 'PocketArticle') {
    try {
      await addRemoteImageToNode({
        node,
        fieldName: 'heroImage',
        url: get(node, 'image.src'),
        store,
        cache,
        createNode,
        createNodeId,
      })
      await addRemoteImageToNode({
        node,
        fieldName: 'domainFaviconImage',
        url: get(node, 'domainFavicon'),
        store,
        cache,
        createNode,
        createNodeId,
      })
    } catch (e) {
      console.error('gatsby-pocket-image ERROR:', e)
    }
  }
}
