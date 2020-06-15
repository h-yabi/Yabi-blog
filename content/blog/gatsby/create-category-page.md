---
title: 【Gatsby】カテゴリ一覧ページを作成する方法
description: Gatsbyでカテゴリ一覧を作成する方法を備忘録として残しておきます。
date: 2020-06-03
mainImg: thumbnail/gatsby-img.jpg
categories: ['Gatsby']
---


## カテゴリ一覧作成時にやること
 - markdown（md, mdx）ファイルに**カテゴリー（categories）**を追加
 - `gatsby-node.js`に全てのカテゴリー情報を取得する記述を追加
 - テンプレート使用に必要な記述を`gatsby-node.js`に追加
 - カテゴリーページの**テンプレートを作成**
 - 全てのカテゴリーを表示する**インデックスページ（/category）**を作成

## markdown（md, mdx）ファイルにカテゴリーを追加する
```javascript:title=sample.md
---
title: 【Gatsby】投稿の見出しにidを付与する方法
~ 省略 ~
categories: ['Gatsby']
---
```
上記のように、titleなどが入った**frontmatter**と呼ばれる場所に**categories**を追記します。

string , number , array型が指定できますが、複数指定することを考慮して**categoriesを配列で指定**しています。

GraphiQL（ http://localhost:8000/___graphql ）に下記のように記述することでデータを取得することが確認できます。

```javascript
{
  allMarkdownRemark {
    group(field: frontmatter___categories) {
      category: fieldValue
      totalCount
    }
  }
}
```


## gatsby-node.jsにテンプレートを使用する記述を追加

```javascript:title=gatsby-node.js
const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
                categories
              }
            }
          }
        }
        categoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  // 〜 省略 〜

  // Create categories pages.
  const categories = result.data.categoriesGroup.group
  const categoriesList = path.resolve(`./src/templates/categories-template.js`)

  categories.forEach(category => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}/`,
      component: categoriesList,
      context: {
        category: category.fieldValue,
      },
    })
  })
}

  // 〜 省略 〜
```

`categoriesGroup`というグループ名（任意）をつけ、graphqlで全てのmarkdownファイルからcategoriesの情報を取得しています。

その後の**Create categories pages.** というコメント以下が、カテゴリー用テンプレートを使用するための記述です。

categoriesの情報を`forEach`で回して、path部分はパス、componentは使用するテンプレート（`categories-template.js` ← 次で作成）を指定しています。

ここでポイントなのが`context`の部分。

contextでは、`category`という名前で、**各カテゴリ名**をテンプレート側に渡す処理を行なっています。

次に説明するテンプレート（`categories-template.js`）で、`pageContext`として受けっています。




## カテゴリページのテンプレートを作成する

```javascript:title=src/templates/categories-template.js
import React from "react"
import { Link, graphql } from "gatsby"

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges } = data.allMarkdownRemark

  return (
    <div>
      <h1>{category}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/category">全てのカテゴリー</Link>
    </div>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
```

テンプレート（`categories-template.js`）を作成し、`gatsby-node.js`に使用のための記述を追加したことで、

下記のように`category/gatsby`の**カテゴリ一覧ページ**が表示されるようになりました！<br>
（cssは調整していない状態です）

<img src="/images/articles/create-category-page/category_img01.jpg" />

最後に、**全てのカテゴリーを表示するページ**を作成していきましょう。




## 全てのカテゴリーを表示するインデックスページを作成

```javascript:title=src/pages/category.js
import React from "react"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const CategoryPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <Helmet title={title} />
    <div>
      <h1>カテゴリ一覧</h1>
      <ul>
        {group.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default CategoryPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
```

このようにカテゴリ一覧ページを作成することで、下記のように表示することができました。
（まだGatsbyのカテゴリしかなく1つしか表示されていませんが、、）

<img src="/images/articles/create-category-page/category_img02.jpg" />

以上です！


## 公式サイト
その他オプションや詳しく知りたい場合は、下記をご覧ください。
<a href="https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/" target="_blank">https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/</a>

