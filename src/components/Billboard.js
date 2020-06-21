import React from 'react'
import Image from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"

const Billboard = () => {
  const { shopifyProduct: product } = useStaticQuery(
    graphql`
      query billboard {
        shopifyProduct(vendor: { eq: "Billboard" }) {
          id
          handle
          title
          productType
          description
          variants {
            id
            shopifyId
            title
            price
            sku
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
    `
  )

  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product

  return (
    <>
      <h1 className="title">Now Available</h1>
      <div className="columns">
        <div className="column">
          <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        </div>
        <div className="column">
          <h3 className="title is-3">{product.title}</h3>
          <p className="subtitle is-4">${firstVariant.price}</p>
          <p className="subtitle is-4">${product.description}</p>
          <Link className="button is-rounded" to={`/product/${product.handle}`}>
            Learn More
          </Link>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Billboard
