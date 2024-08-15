import gql from 'graphql-tag';

const CategoryQuery = gql`
  query CategoryQuery($uid: String!) {
    categories (filters: {category_uid: {eq: $uid}}) {
    items {
      uid
      name
      children {
        uid
        name
      }
      image
      products(pageSize: 5, sort: {position: DESC}) {
        items {
          description {
            html
          }
          uid
          name
          image {
            url
          }
          sku
          price_range {
            minimum_price {
              regular_price {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
}`

const BestsellerQuery = gql`
  query BestsellerQuery($uid: String!) {
    products(filter: {category_uid: {eq: $uid}}, pageSize: 5, sort: {position: DESC}) {
      items {
        uid
        name
        image {
          url
        }
        sku
        price_range {
          minimum_price {
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }`

const LatestProductsQuery = gql`
    query LatestProductsQuery($uid: String!) {
    products(filter: {category_uid: {eq: $uid}}, pageSize: 5, sort: {position: DESC}) {
      items {
        uid
        name
        image {
          url
        }
        sku
        price_range {
          minimum_price {
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }`

const EventProductsQuery = gql`
    query EventProductsQuery {
    products(filter: {category_uid: {eq: "NjE="}}) {
      items {
        uid
        name
        image {
          url
        }
        sku
        price_range {
          minimum_price {
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }`

export default { CategoryQuery, BestsellerQuery, LatestProductsQuery, EventProductsQuery }