import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">GiftCard</span>
        </div>
        <nav className="nav">
          <a href="#check" className="nav-link active">Check Balance</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
