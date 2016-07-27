var fs = require('fs');
var react = require('react');


function getMarkdown(){
	return fs.readFileSync('./ts_ms_markdown.txt', {encoding: 'utf8'});
}

function writePageMarkdown(response){
	var content = fs.readFileSync('./header.html',{encoding: 'utf8'}),
		markdown = fs.readFileSync('./ts_ms_markdown.txt', {encoding: 'utf8'});

	
	content = mergeValues(markdown,content);

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

function mergeValues(markdown,content){

	// Replace all {{key}} with the markdown
	content = content.replace('{{markdown}}',markdown);

	// Return the merged content
	return content;
}

module.exports.writePageMarkdown = writePageMarkdown;
module.exports.getMarkdown = getMarkdown;
module.exports.cssRequest = cssRequest;
module.exports.jsRequest = jsRequest;

