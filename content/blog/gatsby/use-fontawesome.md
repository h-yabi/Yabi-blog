---
title: 【Gatsby】FontAwesomeを簡単に使う方法
description: 今回gatsbyで使用していますが、通常のReactでも同じように使用することができるかと思います。
date: 2020-06-05
mainImg: thumbnail/gatsby-img.jpg
categories: ['Gatsby']
---


## パッケージをインストール
```javascript
yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-font-awesome
```

## FontAwesomeをimport、libraryに追加
```javascript:title=src/pages/index.js
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
library.add(fab, fas, far)

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
```

最初にfontawesomeのコアモジュール（library）、必要なアイコンをインポートし`library`に登録します。

次に、`FontAwesomeIcon`をインポートすることで、下記のように気軽に使用することができます。

今回、カレンダーのアイコンを**TOPページ**と、**記事詳細ページのHeader**で使用した際の呼び出し例を記載します。
```javascript:title=src/pages/index.js
<FontAwesomeIcon icon={["far", "calendar-alt"]} />
```

```javascript:title=src/components/Header/HeaderPosts.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// 〜 コンテンツ 〜

<FontAwesomeIcon icon={["far", "calendar-alt"]} />
```

## FontAwesomeの公式サイト
今回カレンダーのアイコンを使用しましたが、FontAwesomeの公式サイトで使い方アイコンを検索することで見つけることができます。

<a href="https://fontawesome.com/" target="_blank">https://fontawesome.com/</a>





## 参考サイト
<a href="https://qiita.com/mecaota/items/4483481a67a9b2cab37f" target="_blank">https://qiita.com/mecaota/items/4483481a67a9b2cab37f</a>

