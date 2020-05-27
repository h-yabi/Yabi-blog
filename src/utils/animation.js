import * as easings from "d3-ease"

export const fadeInDown = {
  opacity: 1,
  top: 0,
  from: {
    opacity: 0,
    top: -15,
  },
  config: {
    duration: 700,
    easing: easings.easePolyOut,
  },
  delay: 200,
}

export const backgroundImg = {
  opacity: 1,
  filter: 'blur(0px)',
  from: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  config: {
    duration: 1200,
    easing: easings.easeCubicOut,
  },
  delay: 700,
}



