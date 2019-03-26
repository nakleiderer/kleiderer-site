require('dotenv').config()

const config = {
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  },
  pocket: {
    consumerKey: process.env.POCKET_CONSUMER_KEY,
    accessToken: process.env.POCKET_ACCESS_TOKEN,
  },
  googleBooks: {
    key: process.env.GOOGLE_BOOKS_KEY,
  },
}

if (
  !config.contentful.spaceId ||
  !config.contentful.accessToken ||
  !config.pocket.consumerKey ||
  !config.pocket.accessToken ||
  !config.googleBooks.key
) {
  throw new Error(
    "A required environment variable is not set. Consult 'gatsby-config.js' for required variables."
  )
}

module.exports = {
  siteMetadata: {
    title: 'Nicolas Kleiderer',
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/images/`,
      },
    },
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-source-contentful',
      options: config.contentful,
    },
    { resolve: 'gatsby-contentful-book', options: config.googleBooks },
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
        domainFilterString: 'buzzfeed.com',
      },
    },
    'gatsby-pocket-image',
    'gatsby-pocket-date',
    'gatsby-pocket-categories',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {},
      },
    },
  ],
}
