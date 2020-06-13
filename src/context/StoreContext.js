import React, { createContext } from 'react'
import Client from 'shopify-buy'

export const client = Client.buildClient({
  domain: "viet-eat.myshopify.com",
  storefrontAccessToken: "636e986360bb835928fdedfda57407ad",
});

const defaultValues = {
  client,
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {}
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {

  const addProductToCart = async variantId => {
    try {
      const newCheckout = await client.checkout.create()
      const lineItems = [
        {
          variantId,
          quantity: 1
        },
      ]
      const addItems = await client.checkout.addLineItems(
        newCheckout.id,
        lineItems
      )
      // Buy Now Button Code:
      // window.open(addItems.webUrl, "_blank");

      console.log(addItems.webUrl);
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <StoreContext.Provider value={{
      ...defaultValues,
      addProductToCart,
    }}>
      {children}
    </StoreContext.Provider>
  )
}