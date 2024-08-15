import gql from 'graphql-tag';

const profilebar = gql`
 query {
  navigations(where: {title: "Profile Menu"}) {
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

export default profilebar;