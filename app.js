// // In Asynchronous programming model, one thing happens after the next
// //In a non-blocking model, we can run multiple lines of code


const geocode = require('./utils/geocode') //loding in the local geocode file
const forecast = require('./utils/forecast')

const address = process.argv[2] //acessing the command line argument, argv property on process to run commands

if (!address){
    console.log('Please provide an address.')
} else{

geocode(address, (error, { latitude, longitude, location} = {}) => {
    if (error){
      return console.log(error) //will stop the function execution after printing error to the console
    }

    forecast(latitude, longitude, (error, forecastData) => {
       if (error){
        return console.log(error)
       }

       console.log(location)
       console.log(forecastData)
      })
}) //passing forecast into geocode callback function
}

