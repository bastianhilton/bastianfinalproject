import gql from 'graphql-tag';

const overview = gql`
query overview {
  pages(where: {name: "Meeovi"}) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
    }
  }
}`

const aboutQuery = gql`
query aboutQuery {
  navigations(where: {title: "About Us"}) {
    nodes {
      title
      navigationFields {
        menu {
          nodes {
            ... on Website {
              id
              websiteFields {
                link
                type
                icon
                description
              }
              title
            }
          }
        }
      }
    }
  }
}`

const legalQuery = gql`
query legalQuery {
  navigations(where: {title: "Legal"}) {
    nodes {
      title
      navigationFields {
        menu {
          nodes {
            ... on Website {
              id
              websiteFields {
                link
                type
                icon
                description
              }
              title
            }
          }
        }
      }
    }
  }
}`

const companyQuery = gql`
query companyQuery {
  navigations(where: {title: "Company"}) {
    nodes {
      title
      navigationFields {
        menu {
          nodes {
            ... on Website {
              id
              websiteFields {
                link
                type
                icon
                description
              }
              title
            }
          }
        }
      }
    }
  }
}`

const copyrightQuery = gql`
query copyrightQuery {
  navigations(where: {title: "Footer Copyright Menu"}) {
    nodes {
      title
      navigationFields {
        menu {
          nodes {
            ... on Website {
              id
              websiteFields {
                link
                type
                icon
                description
              }
              title
            }
          }
        }
      }
    }
  }
}`

export default {
    overview,
    aboutQuery,
    legalQuery,
    companyQuery,
    copyrightQuery
};