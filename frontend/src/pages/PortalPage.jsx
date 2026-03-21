import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../rooms.css'

const menuSections = [
  {
    title: 'Books and literature',
    links: ['Library', 'Lists of literature for current semesters', 'Purchase of books and materials'],
  },
  {
    title: 'Building information and services',
    links: ['Campus map', 'Facilities'],
  },
  {
    title: 'Communities and student life',
    links: ['Student events', 'Clubs'],
  },
  {
    title: 'Exam and tests',
    links: ['Exam schedule', 'Exam rules'],
  },
  {
    title: 'International opportunities',
    links: ['Exchange programs', 'Study abroad'],
  },
  {
    title: 'Internships',
    links: ['Find internship', 'Internship guidelines'],
  },
  {
    title: 'IT',
    links: ['IT support', 'Passwords'],
  },
  {
    title: 'Rules and guidelines',
    links: ['Policies', 'Regulations'],
  },
  {
    title: 'Semester overview',
    links: ['Calendar', 'Important dates'],
  },
  {
    title: 'Study and career guidance',
    links: ['Counselling', 'Career help'],
  },
  {
    title: 'Study materials',
    links: ['Resources', 'Downloads'],
  },
  {
    title: 'Study start',
    links: ['Introduction', 'First week'],
  },
  {
    title: 'Quality and assessment',
    links: ['Evaluations', 'Feedback'],
  },
]

export default function PortalPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSection = idx => {
    setOpenSection(prev => (prev === idx ? null : idx))
  }

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => { setMenuOpen(false); setOpenSection(null) }

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">
          <a href="/" className="logo">
            <img src="/images/logo.gif" alt="logo" />
          </a>
          <nav className="nav desktop-nav">
            <span>News</span>
            <span>Events</span>
            <span>My programme</span>
            <span onClick={openMenu}>Menu ☰</span>
          </nav>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        id="overlay"
        className={menuOpen ? 'active' : ''}
        onClick={closeMenu}
      />

      {/* SIDE MENU */}
      <div className={`side-menu${menuOpen ? ' active' : ''}`}>
        <div className="menu-header">
          <a href="/" className="logo">
            <img src="/images/logo.gif" alt="logo" style={{ height: '2.3rem' }} />
          </a>
          <span onClick={closeMenu} style={{ cursor: 'pointer' }}>✖</span>
        </div>

        <input className="menu-search" placeholder="Try searching!" />

        {menuSections.map((section, idx) => (
          <div
            key={section.title}
            className={`menu-section${openSection === idx ? ' active' : ''}`}
            onClick={() => toggleSection(idx)}
          >
            <div className="menu-title">
              <span>{section.title}</span>
              <span>{openSection === idx ? '−' : '+'}</span>
            </div>
            <div className="submenu">
              {section.links.map(link => (
                <a key={link} href="#">{link}</a>
              ))}
            </div>
          </div>
        ))}

        {/* Room Availability — below Quality and assessment */}
        <div
          className="menu-section"
          onClick={() => { closeMenu(); navigate('/rooms/table') }}
        >
          <div className="menu-title">
            <span>Room Availability</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Your Study portal</h1>
          <p>
            Here you can find all the information you need for your studies at VIA.
            Quick and easy.
          </p>
          <div className="filters">
            <select><option>Software Technology Engineering</option></select>
            <select><option>Horsens</option></select>
            <select><option>All semesters</option></select>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="events">
        <div className="container">
          <h2>Events</h2>
          <div className="event-row">
            <div className="event-card">
              <img src="/images/event1.jpg" alt="Event" />
              <span className="tag">Friday Bar and Party</span>
              <p>20/03 at 14:00 - 22:00</p>
              <h3>Friday Bar</h3>
              <p>VIA | Gæstekantinen</p>
            </div>
            <div className="event-card">
              <img src="/images/event1.jpg" alt="Event" />
              <span className="tag">Friday Bar and Party</span>
              <p>27/03 at 14:00 - 22:00</p>
              <h3>Friday Bar</h3>
              <p>VIA | Gæstekantinen</p>
            </div>
            <div className="event-card">
              <img src="/images/event2.jpg" alt="Event" />
              <span className="tag">Music and Song</span>
              <p>07/04 at 10:00 - 10:15</p>
              <h3>Joint assembly</h3>
              <p>VIA | HUB C</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHORTCUTS */}
      <section className="shortcuts">
        <div className="container">
          <h2>Shortcuts</h2>
          <div className="shortcut-box">
            {[
              'Bulletin board', 'Itslearning', 'VIAmail', 'Print',
              'Change password', 'Parking permit', 'Group rooms', 'OneDrive',
              'See grades', 'Student counselling', 'SU', 'Leave of absence',
              'Long term illness', 'Parental leave', 'Withdrawing', 'SPS',
              'Library', 'Internship Portal',
            ].map(s => (
              <a key={s} href="#">{s}</a>
            ))}
            {/* Room Availability CTA shortcut */}
            <a
              href="/rooms/table"
              onClick={e => { e.preventDefault(); navigate('/rooms/table') }}
            >
              Room Availability
            </a>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search">
        <div className="container">
          <h2>Looking for something?</h2>
          <div className="search-bar">
            <input type="text" placeholder="Try searching!" />
            <span>🔍</span>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="news">
        <div className="container">
          <div className="news-header">
            <h2>News</h2>
            <a href="#">See all messages</a>
          </div>
          <div className="news-row">
            <div className="news-card">
              <span>Student Services</span>
              <span>March 13</span>
              <h3>Examination plan</h3>
              <p>The examination plan for winter 2025-2026 is now available...</p>
            </div>
            <div className="news-card">
              <span>VIA</span>
              <span>February 27</span>
              <h3>Join VIA Summer School!</h3>
              <p>You can join a summer school course...</p>
            </div>
          </div>
        </div>
      </section>

      {/* MORE FROM VIA */}
      <section className="more">
        <div className="container">
          <h2>More from VIA</h2>
          <div className="more-grid">
            <div className="more-card">
              <img src="/images/more1.png" alt="" />
              <h3>Summer school? What is it?</h3>
              <p>Summer school is a great opportunity...</p>
            </div>
            <div className="more-card">
              <img src="/images/more2.png" alt="" />
              <h3>Winner of VIA's Ildsjælepris 2025</h3>
              <p>Victor has won VIA's award...</p>
            </div>
            <div className="more-card">
              <img src="/images/more3.png" alt="" />
              <h3>How can I use VIA library?</h3>
              <p>VIA Library has many functions...</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-links">
          <span>Cookie policy</span>
          <span>Privacy policy</span>
          <span>Web accessibility</span>
          <span>Contact VIA Service</span>
        </div>
      </footer>

      {/* MOBILE NAV */}
      <nav className="mobile-nav">
        <div>MyVIA</div>
        <div>News</div>
        <div>Events</div>
        <div>Programme</div>
        <div onClick={openMenu}>Menu ☰</div>
      </nav>
    </>
  )
}
