const request = require('request');

var geocodeAddress = (address,callback) => {
  var str = encodeURIComponent(address);
  
  //console.log(str);

  request({url: `http://api.map.baidu.com/geocoder/v2/?address=${str}&output=json&ak=YpyiIwS4g09rKblHLDmHl46M18G6P1jq`,
           json: true
          },
          (error,response,body) => {
            if(error){
              callback('Unable to connect to Google API server');
            }else if(body.status == 0){
            //console.log(JSON.stringify(body,undefined,2));
              callback(undefined,{
                                latitude: body.result.location.lat,
                                longitude: body.result.location.lng
                                }
                      );
            }else{
              callback('Unable to get result');
            }
          }
  );
};

module.exports = {
  geocodeAddress: geocodeAddress
};
