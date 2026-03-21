import { useState } from 'react'
import { useRooms } from '../../hooks/useRooms'

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    ;(acc[item[key]] ??= []).push(item)
    return acc
  }, {})

export default function MapView() {
  const { rooms, lastUpdated, error } = useRooms()
  const [selectedHub, setSelectedHub] = useState('A')

  if (error) return <p style={{ color: 'red' }}>Error loading rooms: {error}</p>
  if (rooms === null) return <p>Loading...</p>

  const hubRooms = rooms.filter(r => r.hubId === selectedHub)
  const byFloor = groupBy(hubRooms, 'floorNumber')

  return (
    <>
      <h2>Map View</h2>
      <p className="last-updated">Last updated: {lastUpdated.toLocaleTimeString()}</p>

      <div className="hub-tabs">
        {['A', 'B', 'C'].map(hub => (
          <button
            key={hub}
            className={`tab-btn ${hub === selectedHub ? 'active' : ''}`}
            onClick={() => setSelectedHub(hub)}
          >
            Hub {hub}
          </button>
        ))}
      </div>

      {Object.keys(byFloor)
        .sort((a, b) => Number(a) - Number(b))
        .map(floor => (
          <div key={floor} className="floor-row">
            <span className="floor-label">Floor {floor}</span>
            <div className="room-grid">
              {[...byFloor[floor]]
                .sort((a, b) => a.roomId.localeCompare(b.roomId))
                .map(room => {
                  const label = room.roomId.split('.').at(-1)
                  const isAvailable = room.status === 0 || room.status === 'Available'
                  return (
                    <div
                      key={room.id}
                      className={`room-cell ${isAvailable ? 'available' : 'occupied'}`}
                      title={room.roomId}
                    >
                      {label}
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
    </>
  )
}
