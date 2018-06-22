const request = require('request');
const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .option({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

const tc = (f) => {
  var result = 5/9 * (f - 32);
  return result.toFixed(2);
};

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://api.map.baidu.com/geocoder/v2/?address=${encodedAddress}&output=json&ak=YpyiIwS4g09rKblHLDmHl46M18G6P1jq`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 1){
    throw Error('Unable to find that address');
  }
 
  var lat = response.data.result.location.lat; 
  var lot = response.data.result.location.lng; 
  var weatherUrl = `https://api.darksky.net/forecast/aeafc88b67053beec833729f5a7b9c38/${lat},${lot}`;

    console.log(response.data.result);
    return axios.get(weatherUrl);
}).then((response) => {
       var temperature = response.data.currently.temperature;
       var apparentTemperature = response.data.currently.apparentTemperature;
       var summary = response.data.daily.summary;
       //console.log(response.data.currently);
       return new Promise((resolve,reject) => {
         resolve({ctemperature:tc(temperature),
                  capparentTemperature: tc(apparentTemperature),
                  summary:summary});
       });
}).then((result) => {
       console.log(`The temperature is ${result.ctemperature}, it feels like ${result.capparentTemperature}`);
       console.log(result.summary);

}).catch((e) => {
  if(e.code == 'ENOTFOUND') {
    console.log('Unable connecto API server');
  } else {
    console.log(e.message);
  }
});

console.log('program end');
