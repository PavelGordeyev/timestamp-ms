var timestamp = require('./scripts/timestamp.js');
var renderer = require('./scripts/renderer.js');

// Create a web server
const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.PORT;

const server = http.createServer(function(request, response){
	// Output the timestamp
	if(request.url === '/' || request.url === ''){
		renderer.writePageMarkdown(response);
	}else if(request.url.indexOf('.js') !== -1){
		renderer.jsRequest(request,response);
	}else if(request.url.indexOf('.css') !== -1){
		renderer.cssRequest(response);
	}else if(request.url === '/favicon.ico'){ // Redirect to index
		response.writeHead(303, {'Location': '/'});
	}else{
		timestamp.getTimeStamp(request,response);
	}
}).listen(port, hostname, function(){
  console.log('Server running at http://${' + hostname + '}:${' + port + '}/');
});

