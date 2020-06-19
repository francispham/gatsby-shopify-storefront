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
  addProductToCart: () => {},
  checkout: {
    lineItems: [],
  }
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)

  useEffect(() => {
    initializedCheckout();
  }, [])

  const initializedCheckout = async () => {
    try {
      // Check if it's a Browser
        const isBrowser = typeof window !== 'undefined';
      // Check if id exists
        const currentCheckoutId = isBrowser
          ? localStorage.getItem('checkout_id')
          : null;

        let newCheckout = null;
        if (currentCheckoutId) {
          // If id exists, fetch checkout from Shopify
          newCheckout = await client.checkout.fetch(currentCheckoutId);
        } else {
          // If id does not, create new checkout
          newCheckout = await client.checkout.create();
          if (isBrowser) {
            localStorage.setItem('checkout_id', newCheckout.id);
          };
        };

      // Set checkout to State
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
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      // Buy Now Button Code:
      // window.open(newCheckout.webUrl, "_blank");
      
      console.log(newCheckout.webUrl);
      setCheckout(newCheckout);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <StoreContext.Provider value={{
      ...defaultValues,
      checkout,
      addProductToCart,
    }}>
      {children}
    </StoreContext.Provider>
  )
}