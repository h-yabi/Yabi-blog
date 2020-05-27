import React from "react"
import { useSpring, animated } from "react-spring"
import { fadeInDown, backgroundImg } from "../../utils/animation.js"
import { Link } from "gatsby"
import styles from "./Header.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PostsHeader = ({ overview }) => {
  const animate_fadeIn = useSpring(fadeInDown)
  const animate_backgroundImg = useSpring(backgroundImg)
  const { title, date } = overview

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

export default PostsHeader
