import SectionTitle from '../ui/SectionTitle'
import './Features.css'

// Swap these for your actual saved filenames in src/assets
import freshOrganicImg from '../../assets/vegies1.png'
import freeDeliveryImg from '../../assets/delivery.png'
import easyPaymentImg from '../../assets/payment.png'

const features = [
  { title: 'Fresh And Organic', desc: 'Lorem Ipsum Dolor,sit Amet Consectetur Adipisicing', image: freshOrganicImg },
  { title: 'Free Delivery', desc: 'Lorem Ipsum Dolor,sit Amet Consectetur Adipisicing Elite', image: freeDeliveryImg },
  { title: 'Easy Payment', desc: 'Lorem Ipsum Dolor,sit Amet Consectetur Adipisicing Elite', image: easyPaymentImg },
]

function Features() {
  return (
    <section className="features" id="features">
      <SectionTitle prefix="Our" highlight="Features" />
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-card-inner">
              <img src={f.image} alt={f.title} className="feature-icon-img" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features