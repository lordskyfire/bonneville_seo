import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/SEO"
import BlogItem from "../components/Blog/blog-item"
import Button from "../components/Button/button"
import { PagerStyles } from "../styles/JournalStyles"

const JournalTemplate = props => {
  const { edges } = props.data.allMarkdownRemark

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <>
      <SEO title="Read more about the projects at Bonneville" />
      <h1>Bonneville Journal</h1>
      <p>
        {" "}
        This is the Bonneville journal. Here you will find an elegant blog
        system that will help you make announcements to your cleints with ease.
      </p>
      <p>
        Each page displays a maximum of 10 posts before displaying the
        pagination component. To change the maximum number of posts per page,
        please visit gatsby-node.js.
      </p>
      {edges.map(({ node }) => {
        const blogNode = node.frontmatter
        return (
          <BlogItem
            fluid={blogNode.featuredImage.childImageSharp.fluid}
            title={blogNode.title}
            excerpt={node.excerpt}
            path={blogNode.path}
            date={blogNode.date}
            tag={blogNode.tags}
          />
        )
      })}
      {/* Paging controls
        If there are multiple pages, show pager */}
      {numPages > 1 && (
        <PagerStyles>
          <div className="btns">
            {!isFirst && (
              <Link to={`/journal/${prevPage}`} rel="prev">
                <Button text="Previous" />
              </Link>
            )}
            {!isLast && (
              <Link to={`/journal/${nextPage}`} rel="next">
                <Button text="Next" />
              </Link>
            )}
          </div>
          <div className="numbers">
            {Array.from({ length: numPages }, (_, i) => (
              <Link
                key={`pagination-numbers${i + 1}`}
                to={`/journal/${i === 0 ? "" : i + 1}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </PagerStyles>
      )}
    </>
  )
}

export default JournalTemplate

export const journalQuery = graphql`
  query journalQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YY")
            path
            tags
            featuredImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
