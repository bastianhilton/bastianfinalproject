import gql from 'graphql-tag';

const socialmenu = gql`
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

export default socialmenu;