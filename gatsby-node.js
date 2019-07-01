const Promise = require('bluebird')
const path = require('path')

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
    const articleTemplate = path.resolve('./src/templates/article.tsx')
    const categoryTemplate = path.resolve('./src/templates/category.tsx')
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
            allMdx {
              edges {
                node {
                  id
                  frontmatter {
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

        const articles = result.data.allMdx.edges;
        articles.forEach(({ node: article }) => {
          createPage({
            path: `/articles/${article.frontmatter.slug}`,
            component: articleTemplate,
            context: { id: article.id}
          });
        });

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
