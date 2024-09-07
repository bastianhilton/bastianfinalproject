import gql from 'graphql-tag';

const product = gql`
 query($sku: String!) {
  products (filter: {sku: {eq: $sku}}) {
    items {
      uid
      name
      rating_summary
      description {
        html
      }
      short_description {
        html
      }
      image {
        url
      }
      format
      size
      color
      sku
      options_container
      only_x_left_in_stock
      price_range {
        minimum_price {
          regular_price {
            currency
            value
          }
        }
      }
      categories {
        name
      }
    }
  }
}`

export default product;