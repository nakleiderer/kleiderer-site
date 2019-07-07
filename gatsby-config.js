require('dotenv').config()

const config = {
  pocket: {
    consumerKey: process.env.POCKET_CONSUMER_KEY,
    accessToken: process.env.POCKET_ACCESS_TOKEN,
  },
}

if (
  !config.pocket.consumerKey ||
  !config.pocket.accessToken
) {
  throw new Error(
    "A required environment variable is not set. Consult 'gatsby-config.js' for required variables."
  )
}

function getPluginConfigForContent(path) {
  return {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/pages/${path}`,
    },
  }
}

module.exports = {
  siteMetadata: {
    title: 'Nicolas Kleiderer',
    subtitle: 'Software Engineer',
    description: 'Thoughtfully developing the future'
  },
  plugins: [
    'gatsby-plugin-top-layout',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-normalize-paths",
            options: {
              pathFields: ["logo", "cover"],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1100,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem;`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              extensions: [{
                identifier: 'equinusocio.vsc-material-theme',
                version: '29.2.0'
              }],
              defaultTheme: 'Material Theme Lighter High Contrast',
              prefersDarkTheme: 'Material Theme Ocean High Contrast',
              prefersLightTheme: 'Material Theme Lighter High Contrast'
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/images/`,
      },
    },
    getPluginConfigForContent("category"),
    getPluginConfigForContent("article"),
    getPluginConfigForContent("book"),
    getPluginConfigForContent("software"),
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-pocket`,
      options: {
        ...config.pocket,
        weeksOfHistory: 52,
        apiMaxRecordsToReturn: 3000,
        getCurrentWeekOnly: `n`,
        stateFilterString: 'all',
        tagFilter: true,
        tagFilterString: 'recommended',
        favouriteFilter: false,
        favouriteFilterValue: 0,
        searchFilter: false,
        searchFilterString: 'These 21 things',
        domainFilter: false,
        domainFilterString: 'google.com',
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {},
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
      },
    },
    'gatsby-kleiderer-article',
    'gatsby-plugin-netlify-cache',
  ],
}
