import SectionTitle from '../ui/SectionTitle'
import './Reviews.css'

const reviewText =
  "Lorem ipsum Dolor,sit Amet Consectetur Adipisicing Elite Earum Aials Volupats Labore Est.Dolorum Tenetur!"

const reviews = [
  { avatar: 'https://i.pravatar.cc/150?img=12', name: 'John Deo' },
  { avatar: 'https://i.pravatar.cc/150?img=32', name: 'John Deo' },
  { avatar: 'https://i.pravatar.cc/150?img=45', name: 'John Deo' },
  { avatar: 'https://i.pravatar.cc/150?img=5',  name: 'John Deo' },
  { avatar: 'https://i.pravatar.cc/150?img=47', name: 'John Deo' },
  { avatar: 'https://i.pravatar.cc/150?img=68', name: 'John Deo' },
]

function Reviews() {
  return (
    <section className="reviews">
      <SectionTitle prefix="Customer's" highlight="Review" />
      <div className="reviews-track">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <img src={r.avatar} alt={r.name} className="review-avatar" loading="lazy" />
            <p className="review-text">{reviewText}</p>
            <h4>{r.name}</h4>
            <div className="review-stars">★★★★☆</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews