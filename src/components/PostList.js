import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

class PostList extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <div>
        {posts.map(post => {
          if (post.node.path !== '/404/') {
            const title = get(post, 'node.frontmatter.title') || post.node.path
            return (
              <div key={post.node.fields.slug}>
                <h3>
                  <Link to={post.node.fields.slug} >
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

PostList.propTypes = {
  route: React.PropTypes.object,
}

export default PostList
