' use strict';

var months=['January','February','March','April','May','June','July','August','September','October','November','December'];

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

module.exports.convertDateUri = convertDateUri;
module.exports.dateToUnix = dateToUnix;
module.exports.unixToDateString = unixToDateString;