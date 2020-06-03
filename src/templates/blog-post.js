import React from "react"
import { Link, graphql } from "gatsby"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Breadcrumb from "../components/Breadcrumb/Breadcrumb"
import * as styles from "../components/common/layout.module.sass"

const BlogPostTemplate = ({ data, pageContext }) => {

  const post = data.markdownRemark
  const frontmatter = post.frontmatter
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />
      <Header overview={frontmatter} />
      <main className={`${styles.contents} ${styles.contents_blog}`}>
        <Breadcrumb title={frontmatter.title} categories={frontmatter.categories} />
        <div className={styles.tableOfContent} dangerouslySetInnerHTML={{__html : post.tableOfContents}} />
        <article className={styles.article_detail}>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
            {/* <Bio /> */}
          </footer>
        </article>
        <nav className={styles.pageNavi}>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </main>
      <Footer/>
    </Layout>
  )
}


export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      rawMarkdownBody
      excerpt(pruneLength: 160)
      html
      tableOfContents(
        maxDepth: 3
      )
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
        categories
      }
    }
  }
`
