const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const geoip = require("geoip-lite");

// Example parking spot data
const parkingSpots = [
  { id: 1, name: "Parking Lot 1", available: true, location: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: "Parking Lot 2", available: false, location: { lat: 37.7746, lng: -122.4188 } },
  { id: 3, name: "Parking Lot 3", available: true, location: { lat: 37.7742, lng: 122.4156 } },
  { id: 4, name: "Parking Lot 4", available: true, location: { lat: 37.7747, lng: -122.4179 } },
];

// Endpoint to get nearby parking spots
app.get('/parking/nearby', (req, res) => {
  try {
    // Get user's IP address from request headers
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Use "geoip-lite" to get user's location from IP
    const geo = geoip.lookup(ip);
    
    if (!geo) {
      return res.status(400).json({ error: 'Could not retrieve user location' });
    }

    const userLocation = {
      lat: geo.ll[0], // Latitude
      lng: geo.ll[1]  // Longitude
    };

    // Filter available spots within a certain radius (for simplicity, using a fixed radius of 0.1 degrees)
    const radius = 0.1;
    const availableSpots = parkingSpots.filter(spot => {
      if (spot.available) {
        const distance = calculateDistance(userLocation, spot.location);
        return distance <= radius;
      }
      return false;
    });

    res.json(availableSpots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to calculate distance between two points using Haversine formula
function calculateDistance(point1, point2) {
  const lat1 = point1.lat;
  const lon1 = point1.lng;
  const lat2 = point2.lat;
  const lon2 = point2.lng;

  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
