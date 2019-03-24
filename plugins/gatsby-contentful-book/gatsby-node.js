const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const Gisbn = require('gisbn')

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

function getBookInfo(apiKey, isbn) {
  const GisbnInstance = new Gisbn(isbn, apiKey, 'us')
  return new Promise((resolve, reject) => {
    GisbnInstance.fetch(function(err, book) {
      if (err) {
        reject(err)
      } else {
        resolve(book)
      }
    })
  })
}

exports.onCreateNode = async (
  { node, actions, store, cache, createNodeId },
  { key }
) => {
  if (!key) {
    throw new Error('Google Books API Key missing from gatsby-contentful-book')
  }
  const { createNode } = actions
  if (node.internal.type === 'ContentfulBook') {
    const isbn = !!node.isbn13 ? node.isbn13 : node.isbn10
    const { authors, description, thumbnail } = !!isbn
      ? await getBookInfo(key, isbn)
      : { authors: null, description: null, thumbnail: null }
    node['description'] = description
    node['authors'] = authors
    if (!!thumbnail) {
      try {
        await addRemoteImageToNode({
          node,
          fieldName: 'cover',
          url: thumbnail,
          store,
          cache,
          createNode,
          createNodeId,
        })
      } catch (e) {
        console.error('gatsby-contentful-book ERROR:', e)
      }
    }
  }
}
