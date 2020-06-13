import React, { useContext } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import "../style.scss"
import logo from "../images/coming-soon.png"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from '../context/StoreContext'

const Header = ({ siteTitle }) => {
  const { addProductToCart } = useContext(StoreContext);

  return (
    <header
      className="navbar"
      style={{ background: "var(--purp)", boxShadow: "var(--elevation-2)" }}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img
            style={{ height: 80, maxHeight: "none", marginBottom: 0 }}
            src={logo}
            alt="Level Up Logo"
          />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <FaShoppingCart 
            onClick={addProductToCart}
            style={{ color: "white", height: 30, width: 30 }}
          />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
