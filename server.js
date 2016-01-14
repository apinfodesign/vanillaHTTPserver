var http = require('http' );
var url  = require('url'  );
var fs   = require('fs'   );
//var qs = require( 'querystring' );
 
var server = http.createServer(function(req, res){

    var inpath = url.parse(req.url).pathname;
    var name = 'miles'; //testing only
    var date = new Date();
     
    console.log ('incoming path name is: ', inpath);

    if ( inpath === '/time' && req.method === 'GET' ){
        console.log(inpath,' is inpath');
        var outTime = date.getHours().toString()+':'+
                      date.getMinutes().toString();
        console.log(outTime);
        res.writeHead(200, "OK" , {'Content-Type': 'text/plain'});
        res.write(outTime + ' is the time');
        res.end();
    }

    else if ( inpath === '/greet/'+name && req.method === 'GET' ){
        console.log("Greeting name received", name);

        res.writeHead(200, "OK" , {'Content-Type': 'text/plain'});

        res.write('hello and welcome '+name);
        res.end();    
    }

    else if ( req.method === 'POST' ){
        console.log("Post request received");
        var name = '';         
        req.on('data', function(chunk) {
                console.log("Received body data:");
                console.log(chunk.toString());
        });

        req.on('end', function() {
          // empty 200 OK response for now
          res.writeHead(200, "OK" , {'Content-Type': 'text/plain'});
          res.end();
        });
     }

    else {
        console.log("[405] " + req.method + " to " + req.url);
        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
        // res.end();
    }
});

module.exports=server;
