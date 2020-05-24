import React from "react"
import { Link } from "gatsby"
import styles from "../components/common/layout.module.sass"

const Layout = ({ children }) => {

  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default Layout
