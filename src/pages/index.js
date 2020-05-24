// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"

// FontAwesome
/* eslint-disable import/first */
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
library.add(fab, fas, far) //他のコンポーネントから呼び出せるようにするための登録処理

import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import * as styles from "../components/common/layout.module.sass"

const BlogIndex = ({ path, data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Yabi Blog"
      />
      <Header overview={data.site.siteMetadata} path={path} />
      <main className={styles.contents}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3>
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </main>
      <Footer/>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            description
          }
        }
      }
    }
  }
`
