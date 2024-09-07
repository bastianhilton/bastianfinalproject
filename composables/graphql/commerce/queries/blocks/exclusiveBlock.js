// graphql/deals.js
import gql from 'graphql-tag';

export const cmsBlocks = gql`
 query {
  cmsBlocks (identifiers: "Exclusives") {
    items {
      title
      content
    }
  }
}
`;