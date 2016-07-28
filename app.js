var timestamp = require('./scripts/timestamp.js');
var renderer = require('./scripts/renderer.js');

// Create a web server
const http = require('http');

const hostname = '0.0.0.0';
//const port = 8080;

const server = http.createServer(function(request, response){
	// Output the timestamp
	console.log("requested url:", request.url);
	if(request.url === '/' || request.url === ''){
		renderer.writePageMarkdown(response);
	}else if(request.url.indexOf('.js') !== -1){
		renderer.jsRequest(request,response);
	}else if(request.url.indexOf('.css') !== -1){
		renderer.cssRequest(response);
	}else if(request.url === '/favicon.ico'){
		// Do nothing
	}else{
		timestamp.getTimeStamp(request,response);
	}
}).listen(process.env.PORT, hostname, function(){
  console.log('Server running at http://${' + hostname + '}:${' + process.env.PORT + '}/');
});


