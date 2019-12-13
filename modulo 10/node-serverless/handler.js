const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const base64url = require('base64-url')

module.exports.endpoint = (event, context, callback) => {
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Ciao 2`,
      }),
    };
  
    callback(null, response);

};

module.exports.testpost = (event, context, callback) => {
    const postedParameters = JSON.parse(event.body)
    console.log(postedParameters.test)

    const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: postedParameters.test,
        }),
      };
    
      callback(null, response);
}
module.exports.jwt = (event, context, callback) => {
    const postedParameters = JSON.parse(event.body)
    const secretKey = postedParameters.secretKey
    const payloadInput = postedParameters.payload
    // JWT usa l'HMAC
    //const token = jwt.sign(payload, secretKey);
    header = JSON.stringify({
        "alg" : "HS256",
        "typ" : "JWT"
    })
    payload = JSON.stringify(payloadInput)
    console.log(header, payload)
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.on('readable', () => {
        // Non appena ha generato l'HMAC viene chiamata questa callback
        const data = hmac.read();
        if (data) {
            signature = data
            const token = base64url.encode(header) + '.' + base64url.encode(payload) + '.' + base64url.encode(signature)
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                jwt: token
                }),
            };
            
            callback(null, response);
          
        }
    });
    // Invio con la write il contenuto da firmare
    hmac.write(base64url.encode(header)+'.'+base64url.encode(payload));
    hmac.end();
    
}