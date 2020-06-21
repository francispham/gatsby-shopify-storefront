import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import ProductsListingItem from '../components/ProductsListing/ProductsListingItem'

const ProductCategoryTemplate = ({ data }) => {
  const { shopifyCollection } = data

  return (
    <Layout>
      <div>
        <h2 className="title">{shopifyCollection.title}</h2>
        <div className="columns is-multiline">
          {shopifyCollection.products.map(product => (
            <ProductsListingItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductCategoryTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
        title
        id
        handle
        description
        productType
        variants {
          shopifyId
          title
          price
          availableForSale
        }
        images {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
