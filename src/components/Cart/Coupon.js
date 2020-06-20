import React, { useState } from 'react'

const Coupon = ({checkCoupon}) => {
  const [coupon, setCoupon] = useState("")
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
          checkCoupon(coupon)
        }}
      >
        <div className="field">
          <label htmlFor="coupon" className="label">
            Coupon
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={coupon}
              className="input is-info"
              placeholder="Please Enter Your Coupon"
              onChange={e => setCoupon(e.target.value)}
            />
          </label>
        </div>
        <button className="button is-light is-rounded is-info">
          Add Coupon
        </button>
      </form>
    </>
  )
}

export default Coupon
