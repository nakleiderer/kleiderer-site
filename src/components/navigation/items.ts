interface GatsbyLinkNavigationItem {
  title: string;
  link: string;
}

interface HTMLLinkNavigationItem {
  title: string;
  externalLink: string;
}

export type NavigationItem = GatsbyLinkNavigationItem | HTMLLinkNavigationItem;

const navigationItems: Array<NavigationItem> = [
  {
    title: 'Articles',
    link: '/article',
  },
  {
    title: 'Books',
    link: '/book',
  },
  {
    title: 'Recommended',
    link: '/category/recommended',
  },
];

export default navigationItems;
