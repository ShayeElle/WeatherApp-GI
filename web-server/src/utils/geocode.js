const request = require('request') //requiring module request that we just installed

//Geocoding: Address -> Lat/Long -> Weather
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hheWVlbGxlIiwiYSI6ImNsZTIxNWE1YzFxY3kzdWxnZThzMnl4YmYifQ.6gza-hZVKKsAK5Ax3AaBBA'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined) //incase we have a error
        } else if (body.features.length === 0){
                callback(' Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode