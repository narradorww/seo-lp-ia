'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './VisitorMap.module.css';
import { getLeadColor } from '@/utils/leadColor';
import { getTooltipContent } from '@/utils/getTooltipContent';

export interface VisitorGeo {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
  leadScore?: number;
  referrer?: string;
}

interface Props {
  locations: VisitorGeo[];
}

const defaultIcon = new L.Icon({
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
        scrollWheelZoom={true}
        zoomControl={true}
        doubleClickZoom={true}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

{locations.map((loc, index) => {
  const color = getLeadColor(loc.leadScore);
  const icon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <Marker
      key={index}
      position={[loc.latitude, loc.longitude]}
      icon={icon}
    >
      <Popup>
        <div dangerouslySetInnerHTML={{ __html: getTooltipContent(loc) }} />
      </Popup>
    </Marker>
  );
})}
      </MapContainer>
    </div>
  );
}
