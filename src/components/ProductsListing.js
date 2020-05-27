import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const PRODUCTS_LISTING_QUERY = graphql`
  query ProductsListingQuery {
    allShopifyProduct {
      edges {
        node {
          id
          title
          description
          descriptionHtml
          variants {
            sku
            price
            id
          }
          publishedAt(formatString: "YYYY")
        }
      }
    }
  }
`

const ProductsListing = () => {
  const data = useStaticQuery(PRODUCTS_LISTING_QUERY)
  debugger
  return (
    <div>
      
    </div>
  )
}

export default ProductsListing
