import gql from 'graphql-tag';

const group = gql`
query NewQuery ($id: ID!) {
  activity(id: $id) {
    content
    creator {
      avatar {
        url
      }
      username
    }
    date
    id
    status
    title
    type
  }
}`

export default group;