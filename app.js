const request = require('request');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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

console.log(argv);

const tc = (f) => {
  var result = 5/9 * (f - 32);
  return result.toFixed(2);
};
geocode.geocodeAddress(argv.a,(errorMessage,result) => {
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(JSON.stringify(result,undefined,2));
    weather.getWeather(result.latitude,result.longitude,
                       (errorMessage,result) => {
                         if(errorMessage){
                           console.log(errorMessage);
                         }else{
                           console.log(`The tempture is ${tc(result.temperature)}, it feels like ${tc(result.apparentTemperature)}`);
                         }
                       }
    );
  }
});

console.log('main end');
