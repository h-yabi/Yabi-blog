---
title: 【React】アニメーションを簡単に適用する方法
description: react-springを使って簡単にアニメーションを適用する方法を備忘録として残しておきます。
date: 2020-06-15
mainImg: thumbnail/react_logo.png
categories: ['React']
---

## react-spring , d3-easeをインストール
アニメーションに必要な```react-spring```ライブラリと、イージングに使用する```d3-ease```をインストールします。

```javascript
yarn add react-spring d3-ease
```

## 簡単な使い方
### useSpring, animatedをインポートする
```javascript
import { useSpring, animated } from 'react-spring'
```

### useSpringにアニメーションを定義
下記は、**opacityが0から1に変化**するサンプルとなります。
```javascript
const props = useSpring({ opacity: 1, from: { opacity: 0 } })
```

### 最後に、アニメーションをviewに適用する
```javascript
<animated.div style={props}>I will fade in</animated.div>
```
 - ```<div> →　<animated.div>```のように、タグの前に```animated.```を付与する（閉じタグも同様）
 - style属性に定義した```props```を渡す

以上！

## 当ブログで使用している書き方

### アニメーションの設定
当ブログでは、メインビジュアルの**テキスト部分（fadeInDown）**と**背景画像（backgroundImg）**にアニメーションを適用しているのですが、その設定が下記になっています。

アニメーションの設定は```src/utils/animation.js```というファイルに記述しています。

```javascript:title=src/utils/animation.js
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
    duration: 800,
    easing: easings.easeCubicOut,
  },
  delay: 500,
}
```


### useSpring, animatedと定義したアニメーションをインポート
```javascript:title=src/components/Header/HeaderTop.jsx
import React from "react"
import { useSpring, animated } from "react-spring"
import { fadeInDown, backgroundImg } from "../../utils/animation.js"

const TopPageHeader = ({ overview }) => {
  const animate_fadeIn = useSpring(fadeInDown)
  const animate_backgroundImg = useSpring(backgroundImg)

  return (
    <React.Fragment>
      <animated.div
        style={{
          ...animate_backgroundImg,
        }}
      ></animated.div>

      <animated.div
        style={{
          ...animate_fadeIn,
        }}
      >
      </animated.div>
    </React.Fragment>
  )
}

export default TopPageHeader
```


## 公式サイト
より高度なアニメーションや詳細については下記より確認できます。<br>
<a href="https://www.react-spring.io/docs/hooks/basics" target="_blank">https://www.react-spring.io/docs/hooks/basics</a>



## 参考サイト
<a href="https://www.dkrk-blog.net/javascript/react_spring01" target="_blank">https://www.dkrk-blog.net/javascript/react_spring01</a>

<a href="https://bagelee.com/programming/react/react-spring-github-trending/" target="_blank">https://bagelee.com/programming/react/react-spring-github-trending/</a><br>


### easingの参考サイト
<a href="https://wizardace.com/d3-transition-ease/" target="_blank">https://wizardace.com/d3-transition-ease/</a>
