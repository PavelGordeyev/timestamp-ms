var timestamp = require('./timestamp.js');
var renderer = require('./renderer.js');

// Create a web server
const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(function(request, response){
	// Output the timestamp
	console.log("requested url:", request.url);
	if(request.url === '/' || request.url === ''){
		renderer.writePageMarkdown(response);
	}else if(request.url.indexOf('.js') !== -1){
		scripts.jsRequest(request,response);
	}else if(request.url.indexOf('.css') !== -1){
		renderer.cssRequest(response);
	}else{
		timestamp.getTimeStamp(request,response);
	}
}).listen(port, hostname, function(){
  console.log('Server running at http://${' + hostname + '}:${' + port + '}/');
});


