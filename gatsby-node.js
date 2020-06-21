const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage }}) => {
  const pages = await graphql(`
    query PagesQuery {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  pages.data.allShopifyProduct.edges.forEach(({ node: { id, handle } }) => {
    createPage({
      path: `/product/${handle}`,
      component: path.resolve("./src/templates/ProductDetailTemplate.js"),
      context: {
        id,
        handle,
      },
    })
  })


  const collections = await graphql(`
    query allShopifyCollections {
      allShopifyCollection {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `)

  collections.data.allShopifyCollection.edges.forEach(
    ({ node: { id, handle } }) => {
      createPage({
        path: `/${handle}`,
        component: path.resolve("./src/templates/ProductCategoryTemplate.js"),
        context: {
          id,
          handle,
        },
      })
    }
  )
}