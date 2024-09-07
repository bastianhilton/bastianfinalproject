import gql from 'graphql-tag';

const topmenu = gql`
query NewQuery {
  navigations(where: {title: "Trending"}) {
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

export default topmenu;