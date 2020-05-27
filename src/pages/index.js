import React from "react"

import ProductsListing from "../components/ProductsListing"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ProductsListing />
  </Layout>
)

export default IndexPage
