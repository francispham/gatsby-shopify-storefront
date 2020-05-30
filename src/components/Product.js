import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Product = ({product}) => {
  return (
    <Link to={`/products/${product.handle}`}>
      <article>
        <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
        <h3>{product.title}</h3>
      </article>
    </Link>
  )
}

export default Product
