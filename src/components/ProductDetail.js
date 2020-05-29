import React, {useState} from 'react'
import ShopifyBuy from '@shopify/buy-button-js'

import Img from 'gatsby-image'

const client = ShopifyBuy.buildClient({
  domain: 'viet-eat.myshopify.com',
  storefrontAccessToken: '636e986360bb835928fdedfda57407ad',
});
const ui = ShopifyBuy.Ui.init(client);

const ProductDetail = ({ product }) => {
  const [SelectedVariant, setVariant] = useState(product.variants[0]);

  return (
    <div>
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
    </div>
  )
}

export default ProductDetail
