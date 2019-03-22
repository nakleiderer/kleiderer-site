const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const articleTemplate = path.resolve('./src/templates/article.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    resolve(
      graphql(
        `
          {
            allContentfulCategory {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            allContentfulArticle {
              edges {
                node {
                  title
                  slug
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

        const articles = result.data.allContentfulArticle.edges
        articles.forEach((article, index) => {
          createPage({
            path: `/articles/${article.node.slug}/`,
            component: articleTemplate,
            context: {
              slug: article.node.slug,
            },
          })
        })

        const categories = result.data.allContentfulCategory.edges
        categories.forEach((category, index) => {
          createPage({
            path: `/categories/${category.node.slug}/`,
            component: categoryTemplate,
            context: { slug: category.node.slug, name: category.node.name },
          })
        })
      })
    )
  })
}
