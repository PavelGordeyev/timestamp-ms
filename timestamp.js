'use strict';

var months=['January','February','March','April','May','June','July','August','September','October','November','December'],
    redirectBool = false;

// Checks if request is a valid date or unix timestamp
function checkRequest(uri){
    if(uri === ""){
        return false;
    }

    return true;
}

// Returns the months as a full string
function getMonth(dateArr){
    return months.filter(function(el){
        return el.substr(0,dateArr[0].length).indexOf(dateArr[0]) >= 0;
    })[0];    
}

// Converts regular date into array, separated on spaces
function convertDateUri(dateUri){
    var dateArr = dateUri.split(' ');

    // Fix month input automatically
    dateArr.splice(0,1,getMonth(dateArr));

    return dateArr;
}

// Converts a date array to unix time 12:00AM (UTC)
function dateToUnix(dateArr){
    var d = new Date(dateArr[2],months.indexOf(getMonth(dateArr)),dateArr[1].substr(0,dateArr[1].length-1),0,0,0,0);
    return d.valueOf() / 1000 - 18000;
}

// Convert unix time to a date string
function unixToDateString(unix){
    var d = new Date(parseInt(unix) * 1000),
        dateString = months[d.getMonth()] + ' ' + d.getDate() + ',' + d.getFullYear();

    return dateString;
}

// Return timestamp object
function getTimeStamp(request,response){
    var unix,
        natural,
        uri = request.url.replace("/",""),
        dateArr = convertDateUri(decodeURIComponent(uri)),
        commonHeader = {'Content-Type': 'text/plain'};

    if(!checkRequest(uri)){
        unix = null;
        natural = null;
    }else{
        if(/^\d+$/.test(uri)){
            // Get the unix time
            unix = parseInt(uri);
            // Get the full date string
            natural = unixToDateString(uri);

            response.writeHead(200,commonHeader);
        }else{
            if(redirectBool){ // Redirected page                
                // Get the unix time
                unix = dateToUnix(dateArr);
                // Get the full date string
                natural = dateArr.join(' ');

                response.writeHead(200,commonHeader);
            }else{ // Redirect to encode page
                redirectBool = true;
                response.writeHead(303, {'Location': '/' + encodeURI(dateArr.join(' '))});
            }       
        }
    }

    // Write the response to the page
    response.write(JSON.stringify({"unix": unix,"natural": natural}));
    response.end();
}

module.exports.getTimeStamp= getTimeStamp;