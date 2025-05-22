'use client';

import { useEffect, useState, useRef } from 'react';
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


export default function VisitorMap({ locations }: Props) {
  // Usar um key único para o MapContainer para forçar recriação quando necessário
  const [mapKey, setMapKey] = useState(`map-${Date.now()}`);
  // Referência para rastrear se o componente está montado
  const isMounted = useRef(true);

  // Recria o mapa quando o componente é montado para evitar problemas de reutilização
  useEffect(() => {
    isMounted.current = true;
    setMapKey(`map-${Date.now()}`);
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Se não houver localizações, exibir uma mensagem
  if (!locations || locations.length === 0) {
    return (
      <div className={styles.mapWrapper}>
        <div className={styles.noData}>
          Nenhuma localização disponível para exibir no mapa.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        key={mapKey} // Usar key única para prevenir reutilização
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
              key={`marker-${index}-${loc.latitude}-${loc.longitude}`}
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
