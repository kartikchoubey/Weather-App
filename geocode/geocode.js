const request=require('request');

var geocodeAddress=(address,callback)=>{
    var encodeUri=encodeURIComponent(address);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUri}&key=AIzaSyBndV3NhfsjKebIDUPslcNkyKlQhMRHZ3M`,
    json:true

},(error,response,body)=>{ 
    if(error){
        callback("Unable To Connect to Google Server");
        console.log(error)
    }else if(body.status==='ZERO_RESULTS'){
        callback('Unable to connect Address not found');
    }else if(body.status==='OK'){
        callback(undefined,{
            Address:body.result[0].formatted_address,
            latitude:body.results[0].geometry.location.lat,
            longitude:body.results[0].geometry.location.lng
        });
    
    }
});
}
module.exports={
    geocodeAddress
}
