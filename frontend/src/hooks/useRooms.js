import { useState, useEffect } from 'react'
import * as signalR from '@microsoft/signalr'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5244'

export function useRooms() {
  const [rooms, setRooms] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [error, setError] = useState(null)

  const loadRooms = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/rooms`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setRooms(await res.json())
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadRooms()

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE}/roomhub`)
      .withAutomaticReconnect()
      .build()

    conn.on('RoomUpdated', loadRooms)
    conn.start().catch(console.error)

    return () => conn.stop()
  }, [])

  return { rooms, lastUpdated, error }
}
