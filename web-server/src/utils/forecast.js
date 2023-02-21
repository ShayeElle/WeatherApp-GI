const request = require('request') //load in the request module

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aa8fb3bcc3ad653b8f47b90189556445&query=' + latitude + ',' + longitude + '&units=f' //customized the units to make weather farenheiht


    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather serveice!', undefined) //if there is a low level error
        } else if(body.error) {
            callback('Unable to find location', undefined) //if there is a problem with the cordinates
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast //exporting the forecast function