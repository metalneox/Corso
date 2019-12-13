const express = require('express')
const bodyParser = require("body-parser")
const crypto = require('crypto');
const base64url = require('base64-url')
//const jwt = require('jsonwebtoken');
const HMAC_JWT_SECRET = "4ee9cb0f1f888ff9303d9fcf5f19b9a7da2aa834a24ff313e272df4162223aaa"
const app = express()
const PORT = 3000

async function generateToken(userId){
    return new Promise(function (resolve,reject) {
        const secretKey = HMAC_JWT_SECRET
        const payloadInput = userId
        // JWT usa l'HMAC
        //const token = jwt.sign(payload, secretKey);
        header = JSON.stringify({
            "alg" : "HS256",
            "typ" : "JWT"
        })
        payload = JSON.stringify(payloadInput)
        const hmac = crypto.createHmac('sha256', secretKey);
    
        hmac.on('readable', () => {
            // Non appena ha generato l'HMAC viene chiamata questa callback
            const data = hmac.read();
            if (data) {
                signature = data
                const token = base64url.encode(header) + '.' + base64url.encode(payload) + '.' + base64url.encode(signature)
                console.log(token)
                resolve(token)
            }else{
                reject()
            }
        });
        // Invio con la write il contenuto da firmare
        hmac.write(base64url.encode(header)+'.'+base64url.encode(payload));
        hmac.end();
    })
}

app.use(bodyParser.json())

app.post('/jwt', async function (req, res) {
    try{
        const jwt_copy = await generateToken(req.body.email)
        console.log(jwt_copy)
        res.json(jwt_copy);
    }catch (e){
        res.send(e)
    }
});
  

app.listen(PORT, () => {
    console.log("server listening on", PORT)
})