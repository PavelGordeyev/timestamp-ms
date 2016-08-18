'use strict';

var helpers = require('./helpers.js');

// Indicator if page has reloaded
var redirectBool = false;

// Return timestamp object
function getTimeStamp(request,response){
    var unix,
        natural,
        uri = request.url.replace("/",""),
        dateArr = helpers.convertDateUri(decodeURIComponent(uri)),
        commonHeader = {'Content-Type': 'text/plain'};

    if(/^\d+$/.test(uri)){
        // Get the unix time
        unix = parseInt(uri);
        // Get the full date string
        natural = helpers.unixToDateString(uri);

        response.writeHead(200,commonHeader);
    }else{
        if(redirectBool){ // Redirected page                
            // Get the unix time
            unix = helpers.dateToUnix(dateArr);
            // Get the full date string
            natural = dateArr.join(' ');

            // Reset redirect indicator
            redirectBool = false;

            response.writeHead(200,commonHeader);
        }else{ // Redirect to encode page
            redirectBool = true;
            response.writeHead(303, {'Location': '/' + encodeURI(dateArr.join(' '))});
        }       
    }
    
    natural = unix ? natural : null;
    // Write the response to the page
    response.write(JSON.stringify({"unix": unix,"natural": natural}));
    response.end();
}

module.exports.getTimeStamp= getTimeStamp;