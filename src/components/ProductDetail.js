import React, { useState, useContext } from 'react'

import Img from 'gatsby-image'
import { StoreContext } from "../context/StoreContext"

const ProductDetail = ({ product }) => {
  const [SelectedVariant, setVariant] = useState(product.variants[0]);
  const { client } = useContext(StoreContext);

  const addToCart = async (variantId) => {
    const newCheckout = await client.checkout.create();

    const lineItems = [
      {
        variantId: variantId.replace("Shopify__ProductVariant__", ""),
        quantity: 1,
      },
    ]
    const addItems = await client.checkout.addLineItems(newCheckout.id, lineItems);
    window.open(addItems.webUrl, "_blank")
    console.log('addItems:', addItems.webUrl);
  };

  return (
    <div className="md:flex">
      <div>
        <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
      </div>
      <div className="md:ml-6">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>${SelectedVariant.price}</p>
        <select
          onChange={e => {
            const selected = product.variants.filter(
              variant => variant.sku === e.target.value
            )
            setVariant(selected[0])
          }}
          value={SelectedVariant.sku}
        >
          {product.variants.map(variant => (
            <option key={variant.id} value={variant.sku}>
              {variant.title}
            </option>
          ))}
        </select>
        <br />
        <button 
          className="bg-blue-500 text-while font-bold rounded px-4 py-2 border-b-4 border-blue-700" 
          onClick={() => addToCart(SelectedVariant.id)}
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
