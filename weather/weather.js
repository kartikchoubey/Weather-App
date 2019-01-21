const request=require('request');

var weatherFetch= (lat,long,callback)=>{
    request({
        url : `https://api.darksky.net/forecast/04d671f55ddac3ec7a860baea4befc8a/${lat},${long}`,
        json:true
       },(error,response,body)=>{
           if(!error && response.statusCode===200){
               callback(undefined,{
                   Temperature:body.currently.temperature,
                   ApparentTemperature:body.currently.apparentTemperature
               });
           }else{
               callback('Unable to Fetch the Weather');
           }

    })
}
module.exports={
    weatherFetch
}