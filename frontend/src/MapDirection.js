import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { RoutingMachine } from 'react-leaflet-routing-machine';

const MapDirections = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCoordinates((prevCoords) => ({
      ...prevCoords,
      [name]: parseFloat(value),
    }));
  };

  const handleShowDirections = () => {
    if (coordinates.lat !== 0 && coordinates.lng !== 0) {
      setDestination({ lat: coordinates.lat, lng: coordinates.lng });
    } else {
      alert('Please enter valid coordinates.');
    }
  };

  return (
    <div>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          name="lat"
          value={coordinates.lat}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          name="lng"
          value={coordinates.lng}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleShowDirections}>Show Directions</button>

      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>Your Location</Popup>
        </Marker>

        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Your Destination</Popup>
        </Marker>

        <RoutingMachine
          position={[coordinates.lat, coordinates.lng]}
          waypoints={[
            { lat: coordinates.lat, lng: coordinates.lng },
            { lat: destination.lat, lng: destination.lng },
          ]}
        />
      </MapContainer>
    </div>
  );
};

export default MapDirections;
