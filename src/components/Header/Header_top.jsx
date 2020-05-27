import React from "react"
import { useSpring, animated } from "react-spring"
import { fadeInDown, backgroundImg } from "../../utils/animation.js"
import styles from "./Header.module.sass"

const TopPageHeader = ({ overview }) => {
  const animate_fadeIn = useSpring(fadeInDown)
  const animate_backgroundImg = useSpring(backgroundImg)
  const { title } = overview

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

export default TopPageHeader
