import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useTransition } from 'react-spring'

import "../style.scss"
import Nav from "./Nav"
import Loader from "./Loader"
import Cart from "./Cart/Cart"
import logo from "../images/coming-soon.png"
import { StoreContext } from "../context/StoreContext"

const Header = () => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(StoreContext);
  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  });
  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0);


  return (
    <>
      <header
        className="level is-mobile"
        style={{ background: "var(--purp)", boxShadow: "var(--elevation-2)" }}
      >
        <div className="level-left">
          <Link to="/">
            <img
              style={{ height: 80, maxHeight: "none", marginBottom: 0 }}
              src={logo}
              alt="Level Up Logo"
            />
          </Link>
          <Nav />
        </div>
        <div className="level-right">
          <div>
            <button
              className="button"
              style={{
                border: "none",
                position: "relative",
                background: "transparent",
              }}
              onClick={toggleCartOpen}
            >
              {qty > 0 && (
                <div
                  style={{
                    top: -5,
                    left: -5,
                    width: 30,
                    height: 30,
                    color: "white",
                    borderRadius: 15,
                    lineHeight: "30px",
                    textAlign: "center",
                    position: "absolute",
                    background: "var(--red)",
                  }}
                >
                  {qty}
                </div>
              )}
              <FaShoppingCart style={{ color: "white", height: 30, width: 30 }} />
            </button>
          </div>
        </div>
        {transitions.map(
          ({ item, key, props }) => item && <Cart key={key} style={props} />
        )}
      </header>
      <Loader />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
