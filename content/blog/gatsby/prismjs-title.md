---
title: 【Gatsby】コードスニペットにタイトルを追加する方法
description: Gatsbyで作成したこの技術ブログに、コードを貼り付けた際にファイル名を追加したいと思い実装しました。
date: 2020-06-04
mainImg: gatsby-img.jpg
categories: ['Gatsby']
---

`prismjs`を既に使用している前提での追加方法となります。

## gatsby-remark-prismjs-titleをインストール
```javascript
yarn add gatsby-remark-prismjs-title
```



## gatsby-config.jsに以下の設定を追加

```javascript:title=gatsby-config.js
{
  resolve: 'gatsby-transformer-remark',
  options: {
    plugins: [
      'gatsby-remark-prismjs-title',
      `gatsby-remark-prismjs`,
    ]
  }
}
```

## 使い方
<pre>
```js:title=example-file.js
alert('how cool is this!');
```
</pre>

このように`title=example-file.js`と記述することで、<br>
下記のように表示することができます。

```js:title=example-file.js
alert('how cool is this!');
```



## CSSをお好みで調整
`\:global`と記述し、追記することで`gatsby-remark-prismjs-title`によって動的に追加されたclassに対してcssを適用することができる。


```css:title=src/components/common/_article.sass
pre[class*="language-"]
  margin: 0 0 30px

\:global
  .gatsby-code-title
    display: block
    position: relative
    z-index: 1
    font-size: 13px
    line-height: 1.5
    span
      display: inline
      padding: 3px 10px
      background: #777
      border-top-left-radius: 0.3em
      border-top-right-radius: 0.3em
      color: #eee
      letter-spacing: .07em
    & + .gatsby-highlight
      margin-top: -20px
      pre[class*="language-"]
        padding-top: 2em
```




## 参考：
<a href="https://www.gatsbyjs.org/packages/gatsby-remark-prismjs-title/" target="_blank">https://www.gatsbyjs.org/packages/gatsby-remark-prismjs-title/</a>
<a href="https://qiita.com/Suzuki09/items/e32832e944d644c588c2" target="_blank">https://qiita.com/Suzuki09/items/e32832e944d644c588c2</a>

