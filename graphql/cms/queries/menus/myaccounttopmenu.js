import gql from 'graphql-tag';

const AccountCommerce = gql`
query AccountCommerce {
  navigations(search: "Account Commerce") {
    nodes {
      title
      navigationFields {
        menu {
          nodes {
            ... on Website {
              id
              websiteFields {
                link
                type
                description
                icon
              }
              title
            }
          }
        }
      }
    }
  }
}`

const AccountSocial = gql`
query AccountSocial {
  navigations(where: {search: "Account Social"}) {
    nodes {
      title
      navigationFields {
        menu {
          nodes {
            ... on Website {
              id
              websiteFields {
                link
                type
                description
              }
              title
            }
          }
        }
      }
    }
  }
}`

export default { AccountCommerce, AccountSocial };