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
  addProductToCart: () => { console.log('Opened Cart!') }
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={defaultValues}>
      {children}
    </StoreContext.Provider>
  )
}