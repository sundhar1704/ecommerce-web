import { Link } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'
import { blogPosts } from '../../data/blogPosts'
import './Blog.css'

function Blog() {
  return (
    <section className="blog">
      <SectionTitle prefix="Our" highlight="Blog" />
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.image} alt={post.title} />
            <div className="blog-meta">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more-btn">Read More</Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blog