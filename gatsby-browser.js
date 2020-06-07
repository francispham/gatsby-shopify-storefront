import React from "react"
import { StoreProvider, client } from "./src/context/StoreContext"

export const wrapRootElement = ({ element }) => {
  return (
    <StoreProvider value={{ client }}>{element}</StoreProvider>
  )
}