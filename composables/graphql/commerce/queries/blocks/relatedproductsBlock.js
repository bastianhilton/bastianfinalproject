// graphql/deals.js
import gql from 'graphql-tag';

export const cmsBlocks = gql`
 query {
  cmsBlocks (identifiers: "relatedproducts") {
    items {
      title
      content
    }
  }
}
`;