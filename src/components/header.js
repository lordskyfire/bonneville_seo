import React, { useEffect, useState } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Logo from "../content/images/bonneville-logo.svg"
import Burger from "./Burger"
import Navigation from "./navigation"
import { HeaderStyles } from "../styles/NavStyles"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50)
    })
  }, [])

  return (
    <HeaderStyles className={scroll ? "scrolled" : null}>
      <div className="logo-cont">
        <Link to="/">
          <img src={Logo} alt={data.site.siteMetadata.title} />
        </Link>
      </div>
      <Burger />
      <Navigation />
    </HeaderStyles>
  )
}
