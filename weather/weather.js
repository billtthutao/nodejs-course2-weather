const request = require('request');

var getWeather = (lat,lot,callback) => {
  request({
    url:`https://api.darksky.net/forecast/aeafc88b67053beec833729f5a7b9c38/${lat},${lot}`,
    json: true
    },
    (error,response,body) => {
      if(error){
        callback('Unable to connect to weather API server');
      }else if(response.statusCode === 400){
        callback('Unable to fetch weather');
      }else if(response.statusCode === 200){
        callback(undefined,{temperature: body.currently.temperature,
                            apparentTemperature: body.currently.apparentTemperature
                           }
        );
      }
    }
  );
};

module.exports.getWeather = getWeather;
