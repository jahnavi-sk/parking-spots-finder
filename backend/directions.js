const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Express middleware to parse JSON bodies
app.use(express.json());

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
    
    res.json(data);
    
  } catch (error) {
    console.error('Error fetching directions:', error.message);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});