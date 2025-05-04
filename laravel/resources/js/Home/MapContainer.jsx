import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FreeMap = () => {
  const position = [30.374203743396134, -9.528900268339903]; 
  
  return (
    <MapContainer 
      center={position} 
      zoom={14} 
      style={{ height: '400px', width: '50%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position}>
        <Popup>Dcheira El Jihadia, Morocco</Popup>
      </Marker>
    </MapContainer>
  );
};

export default FreeMap;