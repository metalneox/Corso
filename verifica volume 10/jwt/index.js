const fs = require('fs')
const crypto = require('crypto');
const base64url = require('base64-url')

data = {
    user: "Giuseppe Verdi"
}


const secretKey = "ecipar"
const payloadInput = data

header = JSON.stringify({
    "alg" : "HS256",
    "typ" : "JWT"
})
payload = JSON.stringify(payloadInput)
const hmac = crypto.createHmac('sha256', secretKey);

hmac.on('readable', () => {
    const data = hmac.read();
    if (data) {
        signature = data
        const token = base64url.encode(header) + '.' + base64url.encode(payload) + '.' + base64url.encode(signature)
        fs.writeFileSync("./jwt.txt",token)
    }
});
hmac.write(base64url.encode(header)+'.'+base64url.encode(payload));
hmac.end();

