import { NavLink, Outlet } from 'react-router-dom'
import '../../rooms.css'

export default function RoomsLayout() {
  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">VIA Room Availability</span>
        <NavLink to="/rooms/table" className="nav-link">Table View</NavLink>
        <NavLink to="/rooms/map" className="nav-link">Map View</NavLink>
        <NavLink to="/rooms/floor-plan" className="nav-link">Floor Plan</NavLink>
        <NavLink to="/" className="nav-link" style={{ marginLeft: 'auto' }}>← Back to Portal</NavLink>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
