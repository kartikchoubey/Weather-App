const yargs=require('yargs');
const axios=require('axios');
 
const argv=yargs.options({
    a:{
        demand:true,
        alias:'address',
        describe:'address of an area',
        string:true
   }
}).help().argv;

var encodeUri=encodeURIComponent(argv.address);

var geoUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUri}&key=AIzaSyDeCJ4XtQimOOx0dPF8PCe9tSFuvE2-LUs`;

axios.get(geoUrl).then((response)=>{
 if(response.data.status==="ZERO_RESULTS"){
   throw new Error("enable to Find the address");
 }
 //console.log(response.data)
    console.log(response.data.results[0].formatted_address);
    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lng;
    var weatherUrl=`https://api.darksky.net/forecast/04d671f55ddac3ec7a860baea4befc8a/${lat},${lng}`;
   
  return axios.get(weatherUrl);
}).then((response)=>{
       var temp=response.data.currently.temperature;
       var appt=response.data.currently.apparentTemperature;
       console.log(`It is currently ${temp}F,but fell like ${appt}F`);
}).catch((e)=>{
    if(e.code==='ENOTFOUND'){
        console.log("Unable to connect to Api Server");
    }else{
        console.log(e.message);
    }
  
});