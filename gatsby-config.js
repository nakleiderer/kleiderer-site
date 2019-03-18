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
}

if (
  !config.contentful.spaceId ||
  !config.contentful.accessToken ||
  !config.pocket.consumerKey ||
  !config.pocket.accessToken
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
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-source-contentful',
      options: config.contentful,
    },
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
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'PocketArticle',
        imagePath: 'image.src',
      },
    },
  ],
}
