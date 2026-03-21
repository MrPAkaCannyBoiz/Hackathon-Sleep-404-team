import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function FloorPlanView() {
  const { rooms, lastUpdated, error } = useOutletContext()
  const [floorData, setFloorData] = useState(null)

  useEffect(() => {
    fetch('/floor_plan_PERCENTAGE.json')
      .then(r => r.json())
      .then(setFloorData)
      .catch(console.error)
  }, [])

  if (error) return <p style={{ color: 'red' }}>Error loading rooms: {error}</p>
  if (floorData === null || rooms === null) return <p>Loading...</p>

  return (
    <>
      <div className="section-heading">
        <h2>Floor Plan</h2>
        <span className="last-updated">Updated {lastUpdated.toLocaleTimeString()}</span>
      </div>

      <div className="legend">
        <span className="legend-item">
          <span className="legend-dot available" />
          Available
        </span>
        <span className="legend-item">
          <span className="legend-dot occupied" />
          Occupied
        </span>
        <span className="legend-item">
          <span className="legend-dot unknown" />
          Unknown
        </span>
      </div>

      {floorData.map(floor => (
        <section key={floor.id} className="floor-plan-section">
          <h3 className="floor-heading">{floor.name}</h3>
          <div className="floor-plan-container" style={{ width: '100%' }}>
            <img
              src={floor.src}
              alt={floor.name}
              className="floor-plan-image"
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

              return (
                <div
                  key={room.id}
                  className="room-dot"
                  style={{ left: `${room.x}%`, top: `${room.y}%` }}
                >
                  <div
                    className={`room-dot__marker ${status}`}
                    title={`${room.name} - ${status}`}
                  />
                  <span className="room-dot__label">{room.name}</span>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
