const fetch = require('node-fetch');
'use strict';

/**
 * Base response HTTP headers
 */
const responseHeaders = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials' : true // Required for cookies, authorization headers with HTTPS 
}
//const requestBody = JSON.parse(event.body);

/**
 * HTTP response templates
 */
const responses = {

    success: (data={}, code=200) => {
        return {
            'statusCode': code,
            'headers': responseHeaders,
            'body': data,
            'isBase64Encoded': false
        }
    },
    error: (error) => {
        return {
            'statusCode': error.code || 500,
            'headers': responseHeaders,
            'body': error,
            'isBase64Encoded': false
        }
    }
}

console.log('Loading function');

module.exports.getWeather = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  let city = event.query.city;
  let country_code = event.query.country_code;
  
  const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&APPID=${process.env.APPID}&units=imperial`;
  //api.openweathermap.org/data/2.5/weather?q={city name}&appid=8d2f5bb86d52ea03b736f8c2db5576e1
  // OpenWeatherMap API endpoint.
  console.log(endpoint)   
  fetch(endpoint)
    .then( res => res.json())
    .then(body => {
      callback(null, responses.success(body))
    })
    .catch(error => {
      callback(null, responses.error(error))
    })
  
};