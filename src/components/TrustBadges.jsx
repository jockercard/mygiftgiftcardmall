import './TrustBadges.css'

const badges = [
  {
    icon: '✓',
    title: 'Available Nationwide',
    description: 'Use your gift card at millions of locations and online.'
  },
  {
    icon: '◆',
    title: 'Visa & Mastercard',
    description: 'Use anywhere Visa or Mastercard are accepted.'
  },
  {
    icon: '∞',
    title: 'Funds Never Expire',
    description: 'Your balance stays available with no expiration date.'
  }
]

function TrustBadge({ icon, title, description }) {
  return (
    <div className="trust-badge">
      <div className="badge-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function TrustBadges() {
  return (
    <div className="trust-badges">
      <h2 className="badges-title">Your Gift Card Benefits</h2>
      {badges.map((b, i) => (
        <TrustBadge key={i} {...b} />
      ))}
    </div>
  )
}

export default TrustBadges
