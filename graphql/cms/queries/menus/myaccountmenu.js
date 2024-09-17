import gql from 'graphql-tag';

const myaccountmenu = gql`
query AccountCommerce {
  menus(where: {slug: "account-shop-menu"}) {
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

export default myaccountmenu;