import React, { useState, useEffect } from 'react';

const UserCoordinates = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user coordinates:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h2>User Coordinates:</h2>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
    </div>
  );
};

export default UserCoordinates;



