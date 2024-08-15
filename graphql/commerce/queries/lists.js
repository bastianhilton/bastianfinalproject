import gql from 'graphql-tag';

const lists = gql`
query NewQuery {
  lists {
    nodes {
      author {
        node {
          username
          avatar {
            url
          }
        }
      }
      date
      id
      lists {
        description
        ispublic
        name
        type
        image {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

export default lists;