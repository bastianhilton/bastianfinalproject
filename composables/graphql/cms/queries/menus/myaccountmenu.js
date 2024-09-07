import gql from 'graphql-tag';

const myaccountmenu = gql`
query NewQuery {
  navigations(where: {search: "Account Commerce"}) {
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

export default myaccountmenu;