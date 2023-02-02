import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Props {
  center: [number, number]
  zoom: number
  popupText: string
}

const MapComponent: React.FC<Props> = ({ center, zoom, popupText }) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          {popupText}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent