import React, { useState } from 'react'

const Coupon = ({ checkCoupon, removeCoupon, checkout }) => {
  const [coupon, setCoupon] = useState("");

  return (
    <>
      {checkout.discountApplications.length > 0 ? (
        <>
          Coupon
          <h5 className="title is-5">
            {checkout.discountApplications[0].code} -{" "}
            {checkout.discountApplications[0].value.percentage}% OFF
          </h5>
          <button
            onClick={removeCoupon}
            className="button is-danger is-small is-outlined is-rounded"
          >
            Remove
          </button>
        </>
      ) : (
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
          <button type="submit" className="button is-light is-rounded is-info">
            Add Coupon
          </button>
        </form>
      )}
    </>
  )
}

export default Coupon
