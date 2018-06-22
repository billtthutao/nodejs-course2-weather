const request = require('request');

  request({
    url: `https://api.darksky.net/forecast/aeafc88b67053beec833729f5a7b9c38/30.58108412692075,114.31620010268132`,
    json: true
  }, (error, response, body) => {
    console.log('test');
    if (error) {
      console.log('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      console.log('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      console.log({
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });


