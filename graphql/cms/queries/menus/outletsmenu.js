import gql from 'graphql-tag';

const outletsmenu = gql`
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
 }`

export default outletsmenu;