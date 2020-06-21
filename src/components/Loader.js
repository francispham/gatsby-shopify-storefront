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
    ({ item, key, props }) =>
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
                display: "flex",
                position: "fixed",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--xtraPurp)",
                ...props,
              }}
            >
              <svg
                width="120"
                height="30"
                viewBox="0 0 120 30"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
              >
                <circle cx="15" cy="15" r="15">
                  <animate
                    attributeName="r"
                    from="15"
                    to="15"
                    begin="0s"
                    dur="0.8s"
                    values="15;9;15"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fillOpacity"
                    from="1"
                    to="1"
                    begin="0s"
                    dur="0.8s"
                    values="1;.5;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                  <animate
                    attributeName="r"
                    from="9"
                    to="9"
                    begin="0s"
                    dur="0.8s"
                    values="9;15;9"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fillOpacity"
                    from="0.5"
                    to="0.5"
                    begin="0s"
                    dur="0.8s"
                    values=".5;1;.5"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="105" cy="15" r="15">
                  <animate
                    attributeName="r"
                    from="15"
                    to="15"
                    begin="0s"
                    dur="0.8s"
                    values="15;9;15"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fillOpacity"
                    from="1"
                    to="1"
                    begin="0s"
                    dur="0.8s"
                    values="1;.5;1"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </animated.div>
          )}
        </div>
      )
  ) 
}

export default Loader
