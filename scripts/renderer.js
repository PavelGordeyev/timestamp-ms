var fs = require('fs');

function writePageMarkdown(response){
	var content = fs.readFileSync('./views/index.html',{encoding: 'utf8'});

	response.write(content);
	response.end();
}

function jsRequest(request,response){
	var jsContents = fs.readFileSync('.' + request.url, {encoding: 'utf8'});
	response.writeHead(200,{'Content-Type': 'text/css'});
	response.write(jsContents);
	response.end();	
}

function cssRequest(response){
	var styleContents = fs.readFileSync('./styles.css', {encoding: 'utf8'});
	response.writeHead(200,{'Content-Type': 'text/css'});
	response.write(styleContents);
	response.end();	
}

module.exports.writePageMarkdown = writePageMarkdown;
module.exports.cssRequest = cssRequest;
module.exports.jsRequest = jsRequest;

