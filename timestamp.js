'use strict';

// Checks if request is a valid date or unix timestamp
function checkRequest(url){
    if(url === ""){
        return false;
    }

    return true;
}

// Convert unix time to a date string
function unixToDateString(unix){
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'],
        d = new Date(parseInt(unix)),
        dateString = months[d.getMonth()] + ' ' + d.getDate() + ',' + d.getFullYear();

    return dateString;
}

// Return timestamp object
function getTimeStamp(request,response){
    var unix,
        natural,
        url = request.url.replace("/","");

    if(!checkRequest(url)){
        unix = null;
        natural = null;
    }else{
        if(/^\d+$/.test(url)){
            unix = parseInt(url);
            natural = unixToDateString(url);
        }
    }

    // Write the response to the page
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.write(JSON.stringify({"unix": unix,"natural": natural}));
    response.end();
}

module.exports.getTimeStamp= getTimeStamp;