'use strict';

// Convert unix time to a date string
function unixToDateString(unix){
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'],
        d = new Date(parseInt(unix)),
        dateString = months[d.getMonth()] + ' ' + d.getDate() + ',' + d.getFullYear();

    return dateString;
}

module.exports.unixToDateString = unixToDateString;