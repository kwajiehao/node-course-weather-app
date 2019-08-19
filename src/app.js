// require core modules before npm modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const mapbox = require('./../../2_weather-app/utils/geocode');
const forecast = require('./../../2_weather-app/utils/forecast');



// create web server, then use methods to tell it what to do
const app = express();


// define paths
const pubDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views/');
const partialsPath = path.join(__dirname, '../templates/partials/');


// setting up handlebars and define views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);


// direct app to use public folder where all resources are stored
// setup static directory to serve
app.use(express.static(pubDirectoryPath));


// dictates what the app does on the home page
app.get('', (req, res) => {
    res.render('index', {
        title: `Kwa's Weather`,
        name: 'Kwa'
    });
});


// dictates what the app does on the about page
app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About page',
        name: 'Kwa'
    });
});

// dictates what the app does on the help page
app.get('/help', (req, res) => {
res.render('Help', {
        title: 'Help page',
        message: 'How can we help you?',
        name: 'Kwa'
    });
});

// dictates what the app does on the weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must include address in search'
        });
    }

    const address = req.query.address;

    mapbox.geocode(address, (error, {latitude, longitude, location} = {}) => {
        // error handling
        if (error) {
            return res.send({
                error
            }); 
        } 

        // call forecast function
        forecast.darksky(longitude, latitude, (error, forecastData) => {
            // error handling
            if (error) {
                return res.send({
                    error
                });
            } 
            
            res.send({
                forecast: forecastData.summary,
                location,
                address
            });
        });
    });

    /*
    res.send({
        forecast: 'cloudy',
        location: 'Hong Kong'
    });
    */
});




// 404 page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Missing Article',
        errorMessage: 'Article not found',
        name: 'Kwa'
    });
});


// 404 pages
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Missing page',
        errorMessage: 'Page not found',
        name: 'Kwa'
    });
});



// we need to listen on a specific port or IP address
app.listen(3000, '127.0.0.1', () => {
	console.log('Server is up on port 3000 of 127.0.0.1')
});
