import React from "react"
import { useSpring, animated } from "react-spring"
import { fadeInDown, backgroundImg } from "../../utils/animation.js"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styles from "./Header.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = ({ path, overview }) => {
  const animate_fadeIn = useSpring(fadeInDown)
  const animate_backgroundImg = useSpring(backgroundImg)
  const topPage = path === "/" ? styles.topPage : ""
  const { title, date } = overview

  const TopPageHeader = () => {
    return (
      <React.Fragment>
        <animated.div
          className={`${styles.bgImg}`}
          style={{
            ...animate_backgroundImg,
          }}
        ></animated.div>

        <animated.div
          className={styles.postPage}
          style={{
            ...animate_fadeIn,
          }}
        >
          <h1 className={styles.title}>{title}</h1>
        </animated.div>
      </React.Fragment>
    )
  }

  const PostsHeader = () => {
    return (
      <React.Fragment>
        <animated.div
          className={`${styles.bgImg} ${styles.bgImg_posts}`}
          style={{
            ...animate_backgroundImg,
          }}
        ></animated.div>

        <animated.div
          className={styles.postPage}
          style={{
            ...animate_fadeIn,
          }}
        >
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
        </animated.div>
      </React.Fragment>
    )
  }

  return (
    <animated.header className={`${styles.header} ${topPage}`}>
      {topPage ? <TopPageHeader /> : <PostsHeader />}
    </animated.header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
