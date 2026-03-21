import { useState, useEffect } from 'react'
import { useRooms } from '../../hooks/useRooms'

export default function FloorPlanView() {
  const { rooms, lastUpdated, error } = useRooms()
  const [floorData, setFloorData] = useState(null)

  useEffect(() => {
    fetch('/floor_plan_data.json')
      .then(r => r.json())
      .then(setFloorData)
      .catch(console.error)
  }, [])

  if (error) return <p style={{ color: 'red' }}>Error loading rooms: {error}</p>
  if (floorData === null || rooms === null) return <p>Loading...</p>

  return (
    <>
      <h2>Floor Plan</h2>
      <p className="last-updated">Last updated: {lastUpdated.toLocaleTimeString()}</p>

      {floorData.map(floor => (
        <section key={floor.id} style={{ marginBottom: 40 }}>
          <h3>{floor.name}</h3>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={floor.src}
              alt={floor.name}
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            {floor.rooms.map(room => {
              const liveRoom = rooms.find(
                r => r.roomId.toLowerCase() === room.name.toLowerCase()
              )
              const status = liveRoom
                ? liveRoom.status === 0 || liveRoom.status === 'Available'
                  ? 'available'
                  : 'occupied'
                : 'unknown'
              const dotColor =
                status === 'available' ? '#22c55e' : status === 'occupied' ? '#ef4444' : '#94a3b8'

              return (
                <div
                  key={room.id}
                  style={{
                    position: 'absolute',
                    left: room.x,
                    top: room.y,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    title={`${room.name} - ${status}`}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: dotColor,
                      border: '2px solid white',
                      boxShadow: '0 0 4px rgba(0,0,0,0.5)',
                      pointerEvents: 'auto',
                      cursor: 'default',
                    }}
                  />
                  <span
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      padding: '1px 4px',
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: 10,
                      lineHeight: 1.4,
                    }}
                  >
                    {room.name}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
