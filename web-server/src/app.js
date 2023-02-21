// In Asynchronous programming model, one thing happens after the next
//In a non-blocking model, we can run multiple lines of code

const express = require('express') //Calling it to create a new express application
const path = require('path'); //determines the path that we can use
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()  //Create variable to work with express

// Define paths for Express config & dirname = directory name. The only dir to be exposed by the server currently.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) // Takes a path to the dir where the partials live

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { //express goes off, gets the view and render into html and make sure html gets back to the requester 
    res.render('index', {
        title: 'Weather',
        name: 'Shaye Ellerbe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shaye Ellerbe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Contact us if you need assistance.',
        name: 'Shaye Ellerbe'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ //if no addy is provided
            error: 'You must provide an address!'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
}) //We now have the finalized endpoint that takes in an address and sends the forecast data back.



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shaye Ellerbe',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Shaye Ellerbe',
        errorMessage: 'Page not found.'
    })
})

// * means tells express to match anything that hasn't been matched so far. This one HAS to come last!

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) // we can only access on our local machine