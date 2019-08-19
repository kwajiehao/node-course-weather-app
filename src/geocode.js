// import api key
const config = require('./config');

// import requests
const request = require('request');





// reusable function for geocoding
const geocode = (address, callback) => {
    // url for mapbox api
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${config.mapBoxKey}&limit=1`;

    // make the http request
    request( { url, json: true }, (error, { body }) => {
        // check for low-level server errors
        if (error) {
            // console.log(error);
            callback('Unable to connect to location services!', undefined); // `undefined` is optional

        // check for whether there are any results
        } else if (body.features.length === 0) {
            callback('There are no results! Try another search.');

        // otherwise there are results
        } else {
            // obtain the data
            const data = body.features;

            // transmit long/lat data
            callback(undefined, { 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};




module.exports = {
    geocode
};





