const fs = require('fs')
var https = require('https');
var certificate =fs.readFileSync('cert.crt',{encoding:'utf8'},function(err, data ) {
    console.log( data );});
var privateKey  = fs.readFileSync('cert.key',{encoding:'utf8'},function(err, data ) {
    console.log( data );});
    
var credentials = {
    key: privateKey,
    cert: certificate
};

const htmlfile  = fs.readFileSync('index.html',{encoding:'utf8'},function(err, data ) {
    console.log( htmlfile );});


var httpsServer = https.createServer(credentials, (req)=> {

});
    httpsServer.listen(8080, function() {
    console.log('HTTPS server listening on port ' + 8080);
});
httpsServer.on('request', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.write(htmlfile,'utf-8');
    res.end();
    // Process the request here
  })