// graphql/deals.js
import gql from 'graphql-tag';

export const cmsBlocks = gql`
 query {
  cmsBlocks (identifiers: "recently-viewed") {
    items {
      title
      content
    }
  }
}
`;