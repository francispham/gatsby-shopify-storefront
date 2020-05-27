import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Product from './Product';

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
  const { allShopifyProduct } = useStaticQuery(PRODUCTS_LISTING_QUERY)
  // debugger;
  return (
    <div>
      {allShopifyProduct.edges.map(edge => (
        <Product 
          product={edge.node} key={edge.node.id}
        />
      ))}
    </div>
  )
}

export default ProductsListing
