const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash");

function templateKeyToPath(templateKey) {
  return path.resolve(`./src/templates/${templateKey}.tsx`)
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
        {
          allMarkdownCategory: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "category"}}}) {
            edges {
              node {
                id
                fields {
                  slug
                }
              }
            }
          }
          allMarkdownArticle: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "article"}}}) {
            edges {
              node {
                id
                fields {
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const categories = result.data.allMarkdownCategory.edges;
        categories.forEach(({ node }) => {
          const path = `category/${node.fields.slug}`
          const component = templateKeyToPath("category")
          const context = { id: node.id }
          createPage({ path, component, context })
        })

        const articles = result.data.allMarkdownArticle.edges;
        articles.forEach(({ node }) => {
          const path = `article/${node.fields.slug}`
          const component = templateKeyToPath("article")
          const context = { id: node.id }
          createPage({ path, component, context })
        })
      })
    )
  })
}
