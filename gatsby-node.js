const path = require("path")

// we don't need to create slugs for our markdowns any more
// module.exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === "MarkdownRemark") {
//     // creating a slug for each page
//     const slug = path.basename(node.fileAbsolutePath, ".md")

//     createNodeField({
//       node,
//       name: "slug",
//       value: slug,
//     })
//   }
// }

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. get path to template
  const blogTemplate = path.resolve("./src/templates/blog.js")
  // 2. get markdown data
  // this function returns a promise! this is a dynamic query not a static one
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  // 3. create new pages
  res.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      // our template
      component: blogTemplate,
      // the path
      path: `/blog/${edge.node.slug}`,
      // context -> the stuff that we pass down to the template
      context: {
        // that;s how your component knows the slug
        slug: edge.node.slug,
      },
    })
  })
}
