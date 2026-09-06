import './SectionTitle.css'

function SectionTitle({ prefix, highlight }) {
  return (
    <div className="section-title">
      <span className="title-prefix">{prefix}</span>
      <span className="title-ribbon">{highlight}</span>
    </div>
  )
}

export default SectionTitle