import gql from 'graphql-tag';

const outlets = gql`
query {
  categories (filters: {name: {match: "Outlets"}}) {
    items {
      uid
      name
      children {
        uid
        name
      }
    }
  }
}
`

export default outlets;