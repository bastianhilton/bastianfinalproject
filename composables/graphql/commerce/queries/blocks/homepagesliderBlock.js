// graphql/deals.js
import gql from 'graphql-tag';

export const cmsBlocks = gql`
 query {
  cmsBlocks (identifiers: "homepage-slider") {
    items {
      title
      content
    }
  }
}
`;