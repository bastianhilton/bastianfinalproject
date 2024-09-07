import gql from 'graphql-tag';

const ecosystemmenu = gql`
query NewQuery {
  navigations(where: {search: "Ecosystemmenu"}) {
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
                image {
                  node {
                    sourceUrl
                  }
                }
              }
              title
            }
          }
        }
      }
    }
  }
}`

export default ecosystemmenu;