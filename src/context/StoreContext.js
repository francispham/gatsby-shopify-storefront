import React, { createContext, useState, useEffect, useCallback } from 'react'
import Client from 'shopify-buy'

export const client = Client.buildClient({
  domain: "viet-eat.myshopify.com",
  storefrontAccessToken: "636e986360bb835928fdedfda57407ad",
});

const defaultValues = {
  client,
  cart: [],
  isCartOpen: false,
  toggleCartOpen: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

// Check if it's a Browser
const isBrowser = typeof window !== 'undefined';

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout);
  const [isCartOpen, setCartOpen] = useState(false);
  // debugger;

  const toggleCartOpen = () => setCartOpen(!isCartOpen);

  useEffect(() => {
    initializedCheckout();
  })

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create();
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id);
      };
      return newCheckout;
    } catch (e) {
      console.error(e);
    }
  }

  const initializedCheckout = useCallback(async () => {
    try {
      // Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null
      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        // If, id exists, but the order was completed (completedAt exists)
        if (newCheckout.completedAt) {
          newCheckout = await getNewId()
        }
      } else {
        // If id does not, create new checkout
        newCheckout = await getNewId()
      }
      // Set checkout to State
      setCheckout(newCheckout)
    } catch (e) {
      console.error(e)
    }
  }, [])

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

  const removeProductFromCart = async lineItemId => {
    // console.log('lineItemId:', lineItemId)
    try {
      const newCheckout = await client.checkout.removeLineItems(
        checkout.id,
        [lineItemId]
      )
      
      setCheckout(newCheckout);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        isCartOpen,
        toggleCartOpen,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}