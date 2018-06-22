const request = require('request');

var geocodeAddress = (address,callback) => {
  var str = encodeURIComponent(address);
  
  //console.log(str);
  callback('inside msg');

};

module.exports = {
  geocodeAddress: geocodeAddress
};
