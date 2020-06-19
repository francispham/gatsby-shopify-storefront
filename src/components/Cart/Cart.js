import React, { useContext } from 'react'
import { animated } from 'react-spring'

import { StoreContext } from '../../context/StoreContext'

const Cart = ({ style }) => {
  const { checkout, toggleCartOpen } = useContext(StoreContext)
  // debugger;

  return (
    <animated.div
      style={{
        top: 0,
        right: 0,
        zIndex: 1,
        width: "50%",
        height: "100%",
        position: "fixed",
        padding: "40px 2%",
        color: "whitesmoke",
        background: "var(--purp-60)",
        boxShadow: "var(--elevation-4)",
        ...style,
      }}
    >
      <button
        style={{
          background: "var(--red)",
          position: "absolute",
          top: 30,
          right: 30,
        }}
        onClick={toggleCartOpen}
        className="delete is-large"
      >
        Close Cart
      </button>
      <h3 className="title">Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id} style={{ display: "flex", marginBottom: "2rem" }}>
          <div style={{ width: 60,height: 60, overflow: "hidden", marginRight: 10, }}>
            <img src={item.variant.image.src} alt="" />
          </div>
          <div>
            <h4 className="title is-4">{item.title}</h4>
            <p className="subtitle is-5">Qlt: {item.quantity}</p>
            <p className="subtitle is-5">${item.variant.price}</p>
          </div>
        </div>
      ))}
      <hr />
      Total: <h5 className="title">${checkout.totalPrice}</h5>
    </animated.div>
  )
}

export default Cart
