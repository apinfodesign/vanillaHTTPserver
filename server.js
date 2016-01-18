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

    else if ( (inpath.slice(0, 6) === '/greet') && req.method === 'GET' ){
        console.log("Greeting name received on path /greet", name);
        var name = inpath.slice(7, inpath.length);
        res.writeHead(200, "OK" , {'Content-Type': 'text/plain'});

        res.write('hello and welcome ' + name);
        res.end();    
    }

    else if ( req.method === 'POST' ){
        console.log("Post request received (raw json )");
        req.on('data', function(data) {
            response = JSON.parse(data.toString()).name;
            console.log("response is: ", response);
         });

        req.on('end', function() {
            res.writeHead(200, "OK" , {'Content-Type': 'text/plain'});
            res.write('*** hello to ' + response + ' ***');
            res.end();
        });
     }

    else {
        console.log("[405] " + req.method + " to " + req.url);
        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
        res.end();
    }
});

module.exports=server;