import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { VideoContext } from '../../context/VideoContext'

interface MapComponentProps {
  waypoint: any
  zoom: number
}

const MapComponent: React.FC<MapComponentProps> = ({ waypoint, zoom }) => {

  const {playerRef} = useContext(VideoContext)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentWaypoint, setCurrentWaypoint] = useState(waypoint[0]) as any

  useEffect(() => {
    if(playerRef.current){
      playerRef.current.subscribeToStateChange((state: { currentTime: SetStateAction<number> }) => {
        setCurrentTime(state.currentTime)
      })
    }
  }, [playerRef])

  useEffect(() => {
    const waypointFound = waypoint.findLast((wp: { timestamp: number }) => wp.timestamp <= currentTime)
    if (waypointFound && waypointFound.timestamp !== currentWaypoint?.timestamp) {
      setCurrentWaypoint(waypointFound);
    }
  }, [currentWaypoint, currentTime, waypoint])

  return (
    <div>
      <MapContainer center={[currentWaypoint.lat, currentWaypoint.lng]} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[currentWaypoint.lat, currentWaypoint.lng]}>
          <Popup>
            {currentWaypoint.label}
          </Popup>
        </Marker>
      </MapContainer>
      <p>Current time: {currentTime} seconds</p>
    </div>
  )
}

export default MapComponent