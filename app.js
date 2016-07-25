var timestamp = require('./timestamp.js');

// Create a web server
const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(function(request, response){

}).listen(port, hostname, function(){
  console.log('Server running at http://${' + hostname + '}:${' + port + '}/');
});


