const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Example parking spot data
const parkingSpots = [
  { id: 1, name: "Parking Lot 1", available: true, location: { lat: 12.8637308, lng: 77.6661602 } },
  { id: 2, name: "Parking Lot 2", available: false, location: { lat: 37.7746, lng: -122.4188 } },
  { id: 3, name: "Parking Lot 3", available: true, location: { lat: 37.7742, lng: 122.4156 } },
  { id: 4, name: "Parking Lot 4", available: true, location: { lat: 37.7747, lng: -122.4179 } },
];

// Endpoint to get nearby parking spots
app.get('/parking/nearby', (req, res) => {
  try {
    // Assume user's location is passed in the request query params as lat and lng
    const userLocation = {
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng),
    };

    if (isNaN(userLocation.lat) || isNaN(userLocation.lng)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

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

// Endpoint to get directions
app.get('/directions', async (req, res) => {
  const { start, end } = req.query;
  const apiKey = 'API_KEY'; // Get your API key from openrouteservice.org

  if (!start || !end) {
    return res.status(400).json({ error: 'Please provide both start and end coordinates' });
  }

  // Make sure coordinates are in the format "longitude,latitude"
  const startCoords = start.split(',').reverse().join(',');
  const endCoords = end.split(',').reverse().join(',');

  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords}&end=${endCoords}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    
    const instructions = data.features[0].properties.segments[0].steps.map(step => step.instruction);

    res.json(instructions);
    
  } catch (error) {
    console.error('Error fetching directions:', error.message);
    res.status(500).json({ error: 'Failed to fetch directions' });
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
