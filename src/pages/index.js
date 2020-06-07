import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import ProductsListing from "../components/ProductsListing/ProductsListing"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ProductsListing />
  </Layout>
)

export default IndexPage
