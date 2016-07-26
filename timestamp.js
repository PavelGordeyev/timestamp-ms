'use strict';

// Checks if request is a valid date or unix timestamp
function checkRequest(uri){
    if(uri === ""){
        return false;
    }

    return true;
}

// Converts regular date to proper query
function convertURI(uri){
    var uriArr = uri.split(' ');
    console.log(uriArr);
}

// Convert unix time to a date string
function unixToDateString(unix){
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'],
        d = new Date(parseInt(unix) * 1000),
        dateString;
        dateString = months[d.getMonth()] + ' ' + d.getDate() + ',' + d.getFullYear();

    return dateString;
}

// Return timestamp object
function getTimeStamp(request,response){
    var unix,
        natural,
        uri = request.url.replace("/","");

    if(!checkRequest(uri)){
        unix = null;
        natural = null;
    }else{
        if(/^\d+$/.test(uri)){
            unix = parseInt(uri);
            natural = unixToDateString(uri);
        }
    }
    convertURI(uri);
    // Write the response to the page
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.write(JSON.stringify({"unix": unix,"natural": natural}));
    response.end();
}

module.exports.getTimeStamp= getTimeStamp;