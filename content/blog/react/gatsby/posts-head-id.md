---
title: 【Gatsby】投稿の見出しにidを付与する方法
description: md（mdx）で作成した記事の見出しにidを付与する方法を備忘録として残しておきます。
date: 2020-05-24
mainImg: gatsby-img.jpg
categories: ['React', 'Gatsby']
---


## gatsby-remark-autolink-headersをインストール
```javascript
yarn add gatsby-remark-autolink-headers
```

## gatsby-config.jsに追加
```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
  ],
}
```

`gatsby-remark-prismjs`を使用している場合は、<br>
`gatsby-remark-autolink-headers`の後にリストとして追加してください。<br>
そうでないと、下記の問題が発生する可能性があります。
<a href="https://github.com/gatsbyjs/gatsby/issues/5764">https://github.com/gatsbyjs/gatsby/issues/5764</a>

下記に記述順の良い例、悪い例を記載します。


## prismjs併用時の書き方（良い・悪い）
```javascript
// good
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-autolink-headers`,
      `gatsby-remark-prismjs`,
    ],
  },
}

// bad
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-prismjs`, // should be placed after `gatsby-remark-autolink-headers`
      `gatsby-remark-autolink-headers`,
    ],
  },
}
```

## その他オプションについて
<a href="https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/" target="_blank">https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/</a>

