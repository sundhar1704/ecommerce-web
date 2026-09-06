
import './About.css'

import cartImage from '../assets/about1.png' // swap for your actual shopping-cart illustration filename

function About() {
  return (
    <>
      <section className="about">
        <h1 className="about-title">About Us</h1>

        <div className="about-image-wrap">
          <img src={cartImage} alt="About GroCo" className="about-image" />
        </div>

        <div className="about-text">
          <p>
            We are a modern fashion brand focused on creating stylish, comfortable, and
            high-quality clothing for everyday life. Our goal is to offer designs that are
            both trendy and timeless, giving customers confidence in every outfit they wear.
          </p>
          <p>
            We believe in using good materials, sustainable practices, and thoughtful
            craftsmanship. Every piece we create is made with attention to detail and a
            passion for fashion.
          </p>
          <p>
            Our team brings together creativity, experience, and fresh ideas to deliver the
            best for our customers. We're committed to offering a smooth shopping experience
            and products that inspire your personal style.
          </p>
          <p>
            Thank you for being a part of our journey. Together, we continue to shape a
            better and more stylish future.
          </p>
        </div>
      </section>
    </>
  )
}

export default About