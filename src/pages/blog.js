import React from "react"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import blogStyles from "../styles/blog.module.scss"

const blogPage = () => {
  // let's retrieve data first
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: published, order: DESC }) {
        edges {
          node {
            title
            slug
            published(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `)

  // map through the data collected from graphql

  const renderPosts = () => {
    return data.allContentfulBlogPost.edges.map((post, idx) => {
      return (
        <li key={idx}>
          <Link to={`/blog/${post.node.slug}`}>
            <h2>{post.node.title}</h2>
          </Link>
          <p>created at: {post.node.published}</p>
        </li>
      )
    })
  }

  return (
    <div>
      <Layout>
        <h1>Blog</h1>
        <ol className={blogStyles.myList}>{renderPosts()}</ol>
      </Layout>
    </div>
  )
}

export default blogPage
