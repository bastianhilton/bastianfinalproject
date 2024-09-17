import gql from 'graphql-tag';

const downloads = gql `
query NewQuery ($id: ID!) {
  customer(id: $id) {
    displayName
    id
    username
    role
    date
    downloadableItems {
      nodes {
        id
        name
        product {
          id
          image {
            sourceUrl
          }
          name
          sku
          type
          ... on SimpleProduct {
            id
            name
            price
          }
        }
        accessExpires
        download {
          file
          fileType
          name
        }
      }
    }
  }
}`

export default { downloads }