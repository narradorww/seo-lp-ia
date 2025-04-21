'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './VisitorMap.module.css';

interface VisitorGeo {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
}

interface Props {
  locations: VisitorGeo[];
}

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function VisitorMap({ locations }: Props) {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.latitude, loc.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              {loc.city}, {loc.region} <br />
              {loc.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
