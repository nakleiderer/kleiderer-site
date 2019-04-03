interface GatsbyLinkNavigationItem {
  title: string
  link: string
}

interface HTMLLinkNavigationItem {
  title: string
  externalLink: string
}

export type NavigationItem = GatsbyLinkNavigationItem | HTMLLinkNavigationItem

const navigationItems: Array<NavigationItem> = [
  {
    title: 'Articles',
    link: '/articles',
  },
  {
    title: 'Books',
    link: '/books',
  },
  {
    title: 'Recommended',
    link: '/categories/recommended/',
  },
]

export default navigationItems
