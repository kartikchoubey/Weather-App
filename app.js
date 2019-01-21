
const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');

 
const argv=yargs.options({
    a:{
        demand:true,
        alias:'address',
        describe:'address of an area',
        string:true
   }
}).help().argv;

geocode.geocodeAddress(argv.address,(error,results)=>{
    if(error){
        console.log(error);
    }else{
        console.log(results.Address);
          weather.weatherFetch(results.lalitude,results.longitude,(error,weatherResult)=>{
            if(error){
                console.log(error);
            }else{
                console.log(`current Weather is ${weatherResult.Temperature}.but its is like ${weatherResult.ApparentTemperature}`);
            } 
          })
    }

})
