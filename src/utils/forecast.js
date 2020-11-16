const request = require('request')
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat,long, callback )=>{
    const url = 'http://api.weatherstack.com/current?access_key=b982d1f86f9e955615208ee489b890cb&query=' + lat + ',' + long + '&units=f'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const cur = body.current
            callback(undefined, cur.weather_descriptions[0] +  ". It is currently " + cur.temperature + " degrees out. It feels like " + cur.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast