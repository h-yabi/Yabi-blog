import React from "react"
import styles from "../components/common/layout.module.sass"

const Layout = ({ children }) => {

  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default Layout
