import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styles from "./Header.module.sass"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = ({ path, overview }) => {
  const topPage = path === "/" ? styles.topPage : ""
  const { title, date } = overview

  const PostsHeader = () => {
    return (
      <div className={styles.postPage}>
        <Link to="/" className={styles.textLogo}>
          Yabi Blog
        </Link>
        <h1 className={`${styles.title} ${styles.postTitle}`}>{title}</h1>
        <div className={styles.date}>
          <span className={styles.icon_calendar}>
            <FontAwesomeIcon icon={["far", "calendar-alt"]} />
          </span>
          {date}
        </div>
      </div>
    )
  }

  return (
    <header className={`${styles.header} ${topPage}`}>
      {topPage ? <h1 className={styles.title}>{title}</h1> : <PostsHeader />}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
