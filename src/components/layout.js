import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ children }) => {

  return (
    <div className="wrapper">
      {children}
    </div>
  )
}

export default Layout
