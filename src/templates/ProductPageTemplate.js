import React from 'react'
import { graphql } from 'gatsby'


import Layout from '../components/Layout';
import ProductDetail from '../components/ProductDetail';

const ProductPageTemplate = ({ data }) => {
  // debugger
  return (
    <Layout>
      <ProductDetail product={data.shopifyProduct} />
    </Layout>
  )
}

export const query = graphql`
  query ProductsQuery($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      images {
        localFile {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
        }
      }
      description
      descriptionHtml
      variants {
        sku
        price
        id
        title
      }
      publishedAt(formatString: "YYYY")
    }
  }
`

export default ProductPageTemplate
