import React, { createContext, useState, useEffect } from 'react'
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
  const [checkout, setCheckout] = useState({});

  useEffect(() => {
    initializedCheckout();
  }, [])

  const initializedCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create();
      setCheckout(newCheckout);

    } catch (e) {
      console.error(e);
    }
  }

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1
        },
      ]
      const addItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      // Buy Now Button Code:
      // window.open(addItems.webUrl, "_blank");

      console.log(addItems.webUrl);
    } catch (e) {
      console.error(e);
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