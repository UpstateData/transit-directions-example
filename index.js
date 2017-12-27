const express = require('express');
const app = express();

const config = require('./config').config;
const googleMapsClient = require('@google/maps').createClient({
    key: config.api_key
});

const port = process.argv[2] || 3000;
app.listen(port);

app.use(express.static('public'));

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