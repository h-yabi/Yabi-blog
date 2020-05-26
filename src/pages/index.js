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
import styles from "../components/common/layout.module.sass"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BlogIndex = ({ path, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges


  return (
    <Layout title={siteTitle}>
      <SEO
        title="Yabi Blog"
      />
      <Header overview={data.site.siteMetadata} path={path} />
      <main className={styles.contents}>
        <div className={styles.article}>
          {posts.map(({ node }) => {
            const frontmatter = node.frontmatter
            const fields = node.fields
            const title = frontmatter.title || fields.slug
            return (
              <article className={styles.article_list} key={fields.slug}>
                <Link to={fields.slug}>
                  <div className={styles.article_list_img}>
                    <img src={`/images/${frontmatter.mainImg}`} alt=""/>
                  </div>
                  <div className={styles.article_list_text}>
                    <h2 className={styles.article_title}>{title}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: frontmatter.description || node.excerpt,
                      }}
                      className={styles.article_description}
                    />
                    <small>
                      <span className={styles.icon_calendar}>
                        <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                      </span>
                      <span className={styles.article_list_date}>{frontmatter.date}</span>


                    </small>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
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
            mainImg
          }
        }
      }
    }
  }
`
