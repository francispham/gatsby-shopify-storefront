import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Billboard from "../components/Billboard"
import ProductsListing from "../components/ProductsListing/ProductsListing"

const IndexPage = () => (
  <Layout>
    <Billboard />
    <SEO title="Home" />
    <ProductsListing />
  </Layout>
)

export default IndexPage
