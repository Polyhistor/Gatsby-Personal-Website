import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import footerStyles from "../styles/footer.mdule.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  const currentYear = new Date().getFullYear()
  return (
    <footer className={footerStyles.footer}>
      <p>
        {`Created by ${
          data.site.siteMetadata.author
        }, copyright ${currentYear}`}{" "}
      </p>
    </footer>
  )
}

export default Footer
