var express = require('express');
const axios = require('axios')

var app = express();
const clientId = '280461214346-c4nnhpqfj2qsqnt86662dapj0k4l5tpo.apps.googleusercontent.com'
const clientSecret = 'eKSucpEO8TGxwAYSyV7eRK0o'
const redirectUri = 'http://localhost:3000/auth'

// https://console.developers.google.com/apis
// Credenziali > Crea Credenziali > ID Client Oauth

app.get('/', function (req, res) {
    
  let url = 'https://accounts.google.com/o/oauth2/v2/auth'
  
  const redirectUriEncoded = encodeURIComponent(redirectUri)
  const scope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile')
  const responseType = 'code'
  const accessType = 'offline'

  url = url + '?client_id=' + clientId + '&redirect_uri=' 
  + redirectUriEncoded + '&scope=' + scope + '&response_type=' + responseType + '&access_type=' +accessType
  res.send('<a href="'+url+'">Accedi con Google</a>')
})
// http://localhost:3000/auth?code=4%2FtwHCEwE51laOZt-Q_0np1awJVst_A-sF4nyhyHpI8MU2byIboTB1QtcNtzhCT2QmOT3DeYWU8GYSOG1bRHPlwR4&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&session_state=45141d48376d7691c07f04eb520b5b40325a7c8e..2d45&prompt=consent#
app.get('/auth', async function(req, res) {
 
    const error = req.query.error
    const code = req.query.code
    if(error){
        return res.send('Errore!')
    }
    const url = 'https://oauth2.googleapis.com/token'
    try{
        const response = await axios.post(url, {
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        })
   
        const body = response.data
        const accessToken = body.access_token
        const refreshToken = body.refresh_token
        console.log({
            accessToken,
            refreshToken
        })
        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token='+accessToken)
        console.log(profileResponse.data)
        // Controllo se esiste l'id dell'utente in database se no lo creo
        // SELECT * FROM users WHERE googleId='profileResponse.data.id'
        // INSERT INTO users (id, googleId, firstName, lastName) VALUES (profileResponse)
        
        // Faccio un redirect
        // Setto il cookie con un token JWT o Token di Sessione

        // PippoPluto@test.com
        // pippopluto@test.com

        // email
        // emailHash -> lowercase(email)
    }catch(e){
        console.error(e)
    }
    
})

app.listen(3000, function () {
  console.log('Listening 3000')
});