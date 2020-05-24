import React from "react"
import styles from "./Footer.module.sass"

const Footer = () => {
  return (
    <div className={styles.footerWrap}>
      <footer className={styles.footer}>
        <div className={styles.footer__title}>Yabi Blog</div>
        Copyright © {new Date().getFullYear()}. h-yabi
      </footer>
    </div>
  )
}

export default Footer
