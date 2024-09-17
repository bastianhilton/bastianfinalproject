import gql from 'graphql-tag';

const topmenu = gql`
query AccountCommerce {
  menus(where: {slug: "sidebar-top-menu"}) {
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

export default topmenu;