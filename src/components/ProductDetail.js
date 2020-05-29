import React, {useState, useLayoutEffect} from 'react'
import ShopifyBuy from '@shopify/buy-button-js'
import { Base64 } from 'js-base64'

import Img from 'gatsby-image'

const ProductDetail = ({ product }) => {
  const [SelectedVariant, setVariant] = useState(product.variants[0]);
  useLayoutEffect(() => {
    const client = ShopifyBuy.buildClient({
      domain: 'viet-eat.myshopify.com',
      storefrontAccessToken: '636e986360bb835928fdedfda57407ad',
    });
    const ui = ShopifyBuy.UI.init(client);
    const decoded = Base64.decode(product.shopifyId);       // gid://shopify/Product/5245041541285
    const actualId = decoded.replace("gid://shopify/Product/", "") // 5245041541285
    console.log('actualId:', actualId)
    
    ui.createComponent('product', {
      id: actualId,
      node: document.getElementById("button"),
    })

    return () => {},[]
  })

  return (
    <div>
      {/* Checkout this Link fro Styling: https://shopify.github.io/buy-button-js/customization/ */}
      <div id="button"></div>
      
      {/* Before Shopify Drop-in iFrame Cart:
        <h1>{product.title}</h1>
        <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
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
      */}
    </div>
  )
}

export default ProductDetail
