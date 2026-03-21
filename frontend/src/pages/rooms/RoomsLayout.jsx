import { NavLink, Outlet } from 'react-router-dom'
import { useRooms } from '../../hooks/useRooms'
import '../../rooms.css'

export default function RoomsLayout() {
  const roomsData = useRooms()
  const { rooms } = roomsData

  const availableCount = rooms ? rooms.filter(r => r.status === 0 || r.status === 'Available').length : null
  const totalCount = rooms ? rooms.length : null

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>VIA Room Availability</span>

          <nav className="nav desktop-nav">
            <NavLink
              to="/rooms/table"
              className="nav-link"
              style={({ isActive }) => isActive ? { fontWeight: 700, borderBottom: '2px solid #593f14', paddingBottom: 2 } : {}}
            >
              Table View
            </NavLink>
            <NavLink
              to="/rooms/map"
              className="nav-link"
              style={({ isActive }) => isActive ? { fontWeight: 700, borderBottom: '2px solid #593f14', paddingBottom: 2 } : {}}
            >
              Map View
            </NavLink>
            <NavLink
              to="/rooms/floor-plan"
              className="nav-link"
              style={({ isActive }) => isActive ? { fontWeight: 700, borderBottom: '2px solid #593f14', paddingBottom: 2 } : {}}
            >
              Floor Plan
            </NavLink>
          </nav>

          <NavLink to="/" className="nav-link" style={{ marginLeft: 'auto' }}>
            ← Portal
          </NavLink>
        </div>

        {availableCount !== null && (
          <div style={{
            background: 'rgba(246,241,231,0.9)',
            borderTop: '1px solid rgba(89,63,20,0.1)',
            padding: '6px 0',
          }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-available">{availableCount} available</span>
              <span className="badge badge-occupied">{totalCount - availableCount} occupied</span>
              <span className="last-updated">out of {totalCount} rooms total</span>
            </div>
          </div>
        )}
      </header>

      <main className="container">
        <Outlet context={roomsData} />
      </main>
    </>
  )
}
