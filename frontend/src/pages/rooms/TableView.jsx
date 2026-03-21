import { useOutletContext } from 'react-router-dom'

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    ;(acc[item[key]] ??= []).push(item)
    return acc
  }, {})

export default function TableView() {
  const { rooms, lastUpdated, error } = useOutletContext()

  if (error) return <p style={{ color: 'red' }}>Error loading rooms: {error}</p>
  if (rooms === null) return <p>Loading...</p>

  const byHub = groupBy(rooms, 'hubId')

  return (
    <>
      <div className="section-heading">
        <h2>Room Availability</h2>
        <span className="last-updated">Updated {lastUpdated.toLocaleTimeString()}</span>
      </div>
      {Object.keys(byHub).sort().map(hubId => {
        const byFloor = groupBy(byHub[hubId], 'floorNumber')
        return (
          <section key={hubId} className="table-group">
            <h3>{hubId === 'A' ? 'Hub A' : hubId === 'B' ? 'Hub B' : `Hub ${hubId}`}</h3>
            {Object.keys(byFloor)
              .sort((a, b) => Number(a) - Number(b))
              .map(floor => (
                <div key={floor}>
                  <h4 className="floor-heading">Floor {floor}</h4>
                  <table className="room-table">
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th>Status</th>
                        <th>Last Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...byFloor[floor]]
                        .sort((a, b) => a.roomId.localeCompare(b.roomId))
                        .map(room => (
                          <tr key={room.id}>
                            <td>{room.roomId}</td>
                            <td>
                              <span
                                className={`badge ${
                                  room.status === 0 || room.status === 'Available'
                                    ? 'badge-available'
                                    : 'badge-occupied'
                                }`}
                              >
                                {room.status === 0 || room.status === 'Available'
                                  ? 'Available'
                                  : 'Occupied'}
                              </span>
                            </td>
                            <td>{new Date(room.lastActivityTime).toLocaleTimeString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </section>
        )
      })}
    </>
  )
}
