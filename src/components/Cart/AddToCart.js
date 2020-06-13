import React, { useContext } from "react"

import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId }) => {
  const { addProductToCart } = useContext(StoreContext);

  return (
    <button
      className="button is-primary is-rounded"
      onClick={() => addProductToCart(variantId)}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart
