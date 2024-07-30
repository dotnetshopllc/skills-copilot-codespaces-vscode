// create web server    
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

// create server
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    var page = query.page;
    // read file
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'});
            // write file
            res.write(data.toString());
        }
        // send response
        res.end();
    });
}).listen(8080);
console.log('Server running at http://