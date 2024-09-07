import gql from 'graphql-tag';

const socialmenu = gql`
query NewQuery {
navigations(where: {title: "Account Social"}) {
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

export default socialmenu;