import React, { useContext } from 'react'
import { animated } from 'react-spring'

import { StoreContext } from '../../context/StoreContext'

const Cart = ({ style }) => {
  const { checkout, toggleCartOpen } = useContext(StoreContext)
  console.log(checkout.lineItems);

  return (
    <animated.div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        padding: 60,
        background: "var(--purp)",
        color: "whitesmoke",
        boxShadow: "var(--elevation-4)",
        ...style,
      }}
    >
      <button onClick={toggleCartOpen}>Close Cart</button>
      <h3>Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.quantity}</p>
          <p>${item.variant.price}</p>
        </div>
      ))}
    </animated.div>
  )
}

export default Cart
