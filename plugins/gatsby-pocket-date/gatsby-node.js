exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'PocketArticle') {
    node['weekRead'] = new Date(node.readWeek * 1000).toISOString()
    node['timeAdded'] = new Date(parseInt(node.time_added) * 1000).toISOString()
    node['timeRead'] = new Date(node.time_read * 1000).toISOString()
    node['timeUpdated'] = new Date(
      parseInt(node.time_updated) * 1000
    ).toISOString()
  }
}
