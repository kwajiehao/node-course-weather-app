// import api key
const config = require('../config');

// import requests
const request = require('request');





// reusable function for hitting darksky api
const darksky = (longitude, latitude, callback) => {
    // url for darksky api
    const url = `https://api.darksky.net/forecast/${config.darkSkyKey}/${latitude},${longitude}?units=si`;

    // make the http request
    request( { url, json: true }, (error, { body }) => {
        // check for low-level server errors
        if (error) {
           callback('Unable to connect to weather services!', undefined);

        // check for whether body has an error
        } else if (body.error) {
            callback('There is a problem with the coordinates provided.');

        // otherwise there are results
        } else {
            // transmit weather data
            callback(undefined, { 
                summary: `${body.hourly.summary}.  The temperature is ${body.currently.temperature}, and the chances of rain are ${body.currently.precipProbability}.`,
                temperature: body.currently.temperature,
                rainProbability: body.currently.precipProbability
            });
        }
    });
};



module.exports = {
    darksky
};

