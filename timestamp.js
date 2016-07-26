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

// Converts regular date to proper query
function convertURI(uri){
    var uriArr = uri.split(' ');
    return uriArr;
}

function dateToUnix(dateArr){
    var month = months.filter(function(el){
        return el.substr(0,dateArr[0].length).indexOf(dateArr[0]) >= 0;
    });

    console.log(month);

    var d = new Date(dateArr[2],months.indexOf(month[0]),dateArr[1].substr(0,dateArr[1].length-1),0,0,0,0);

    return d.valueOf() / 1000;
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
        arr,
        encoded,
        decoded = decodeURIComponent(uri);

    console.log(decoded);
    if(!checkRequest(uri)){
        unix = null;
        natural = null;
    }else{
        if(/^\d+$/.test(uri)){
            unix = parseInt(uri);
            natural = unixToDateString(uri);
            response.writeHead(200,{'Content-Type': 'text/plain'});
        }else{
            if(redirectBool){ // Redirected page
                response.writeHead(200,{'Content-Type': 'text/plain'});
                unix = dateToUnix(convertURI(decoded));
                natural = decoded;
            }else{ // Redirect to encode page
                //encoded = encodeURI(decoded);
                redirectBool = true;
                response.writeHead(303, {'Location': '/' + encodeURI(decoded)});
            }       
        }
    }
    //convertURI(uri);
    // Write the response to the page
    
    response.write(JSON.stringify({"unix": unix,"natural": natural}));
    response.end();
}

module.exports.getTimeStamp= getTimeStamp;