import React from "react"
import PropTypes from "prop-types"
import Header_top from "./Header_top"
import Header_posts from "./Header_posts"
import styles from "./Header.module.sass"

const Header = ({ path, overview }) => {
  const topPage = path === "/" ? styles.topPage : ""

  return (
    <header className={`${styles.header} ${topPage}`}>
      {topPage ? (
        <Header_top overview={overview} />
      ) : (
        <Header_posts overview={overview} />
      )}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
