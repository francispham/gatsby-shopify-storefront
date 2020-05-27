import React from 'react'
import Img from 'gatsby-image'

const Product = ({product}) => {
  return (
    <article>
      <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
      <h3>{product.title}</h3>
    </article>
  )
}

export default Product
