import React, { useContext } from "react"
import { animated, useTransition } from "react-spring"

import { StoreContext } from "../context/StoreContext"

const Loader = () => {
  const { isLoading } = useContext(StoreContext);

  const transitions = useTransition(isLoading, null, {
    from: { transform: "translate3d(1, 1, 1)", opacity: 0 },
    enter: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    leave: { transform: "translate3d(1, 1, 1)", opacity: 0 },
  })

  return transitions.map(
    ({ item ,key, props }) =>
      item && (
        <div>
          {isLoading && (
            <animated.div
              key={key}
              style={{
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                bottom: 0,
                position: "fixed",
                background: "var(--xtraPurp)",
                ...props,
              }}
            >
              Loading
            </animated.div>
          )}
        </div>
      )
  ) 
}

export default Loader
