import React, { useState, useContext } from 'react'

import Img from 'gatsby-image'
import { StoreContext } from "../context/StoreContext"

const ProductDetail = ({ product }) => {
  const [SelectedVariant, setVariant] = useState(product.variants[0]);
  const { client } = useContext(StoreContext);

  const addToCart = async () => {
    const newCheckout = await client.checkout.create();
    console.log(product.variants[0].id);  // Not the variant ID
    // => Shopify__ProductVariant__Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNDQzNTE5ODAyNTg5Mw==
    const lineItems = [
      {
        variantId: product.variants[0].id.replace("Shopify__ProductVariant__", ""), // Getting real variant ID
        quantity: 1,
      },
    ]
    const addItems = await client.checkout.addLineItems(newCheckout.id, lineItems);
    console.log('addItems:', addItems.webUrl);
  };
  addToCart();

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
