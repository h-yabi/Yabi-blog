---
title: 【Gatsby】カテゴリ一覧ページを作成する方法
description: Gatsbyでカテゴリ一覧を作成する方法を備忘録として残しておきます。
date: 2020-06-03
mainImg: gatsby-img.jpg
categories: ['Gatsby']
---


## カテゴリ一覧作成の流れ
1. markdown（md, mdx）ファイルに**カテゴリー**を追加する
2. 全ての投稿のカテゴリーを取得する
3. カテゴリーページの**テンプレートを作成**する（ for /categories/{category}）
4. テンプレートを使用するために`gatsby-node.js`を修正する
5. 全てのカテゴリーを表示する**インデックスページ（/category）を作成**する

## 1. markdown（md, mdx）ファイルにカテゴリーを追加する




```javascript:title=example-file.js
yarn add gatsby-remark-autolink-headers
```


## その他オプションについて
<a href="https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/" target="_blank">https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/</a>

