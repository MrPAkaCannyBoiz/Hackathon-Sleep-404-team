import { Routes, Route, Navigate } from 'react-router-dom'
import PortalPage from './pages/PortalPage.jsx'
import RoomsLayout from './pages/rooms/RoomsLayout.jsx'
import TableView from './pages/rooms/TableView.jsx'
import MapView from './pages/rooms/MapView.jsx'
import FloorPlanView from './pages/rooms/FloorPlanView.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortalPage />} />
      <Route path="/rooms" element={<RoomsLayout />}>
        <Route index element={<Navigate to="table" replace />} />
        <Route path="table" element={<TableView />} />
        <Route path="map" element={<MapView />} />
        <Route path="floor-plan" element={<FloorPlanView />} />
      </Route>
    </Routes>
  )
}
