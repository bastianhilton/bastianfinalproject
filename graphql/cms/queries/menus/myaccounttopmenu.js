import gql from 'graphql-tag';

export const AccountCommerce = gql`
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

export const AccountSocial = gql`
query AccountCommerce {
  menus(where: {slug: "account-social-menu"}) {
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

//export default { AccountCommerce, AccountSocial };