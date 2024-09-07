import gql from 'graphql-tag';

const bottomsidebarmenu = gql`
query NewQuery {
  navigations(where: {search: "Try Something New"}) {
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
                icon
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

export default bottomsidebarmenu;