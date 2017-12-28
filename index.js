const express = require('express');
const app = express();
const port = process.argv[2] || 3000;
app.listen(port);

const config = require('./config').config;

// Create new Google Map API client.
const googleMapsClient = require('@google/maps').createClient({
    key: config.api_key
});

// Serve static assets.
app.use(express.static('public'));

// Route for transit directions lookup.
app.get('/directions', (req, res) => {
    let options = config.options;
    options.origin = req.query.origin;
    options.destination = req.query.destination;
    
    try {
        googleMapsClient.directions(options, (err, response) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            res.json(response.json);
        });
    }
    catch (e) {
        res.status(400).json({ error: 'Invalid request' });
    }
});