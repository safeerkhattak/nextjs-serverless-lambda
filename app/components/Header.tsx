import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h2>Hussain Alaidarous</h2>
          <span className="tagline">Next.js Serverless Deployment</span>
        </div>
        <nav className="header-nav">
          <Link href="/" className="nav-item">
            Home
          </Link>
          <Link href="/about" className="nav-item">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

