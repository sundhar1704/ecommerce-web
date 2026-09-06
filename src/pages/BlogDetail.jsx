import { useParams, useNavigate, Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import './BlogDetail.css'

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <section className="blog-detail-page">
        <p>Post not found.</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </section>
    )
  }

  return (
    <section className="blog-detail-page">
      <div className="blog-detail-inner">
        <img src={post.image} alt={post.title} className="blog-detail-img" />

        <div className="blog-detail-meta">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>

        <h1>{post.title}</h1>

        <div className="blog-detail-body">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <Link to="/" className="back-to-blog-btn">← Back to Home</Link>
      </div>
    </section>
  )
}

export default BlogDetail