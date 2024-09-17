import gql from 'graphql-tag';

const bottomsidebarmenu = gql`query AccountCommerce {
  menus(where: {slug: "sidebar-bottom-menu"}) {
    nodes {
      menuItems {
        nodes {
          id
          label
          path
        }
      }
      name
      id
      slug
    }
  }
}`

export default bottomsidebarmenu;