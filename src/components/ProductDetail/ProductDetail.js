import React, { useState, useContext } from 'react'

import Img from 'gatsby-image'
import { StoreContext } from "../../context/StoreContext"

const ProductDetail = ({ product }) => {
  const [SelectedVariant, setVariant] = useState(product.variants[0]);
  const { client } = useContext(StoreContext);
  console.log('client:', client)

  return (
    <div>
      <h1>{product.title}</h1>
      <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
      <p>{product.description}</p>
      <p>${SelectedVariant.price}</p>
      <select 
        onChange={e => {
          const selected = product.variants.filter(variant => variant.sku === e.target.value);
          setVariant(selected[0]);
        }} 
        value={SelectedVariant.sku}
      >
        {
          product.variants.map(variant => (
            <option key={variant.id} value={variant.sku}>{variant.title}</option>
          ))
        }
      </select>
    </div>
  )
}

export default ProductDetail
