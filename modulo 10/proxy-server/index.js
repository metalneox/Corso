const http = require('http')

const server = http.createServer(function (request,response){
   console.log('incoming request') 
   console.log({
      url: request.url,
      mehod: request.method,
      headers: request.headers
   })
   /*
   response.writeHead(200,{"Content-Type":"text/html; charset=utf-8"})
   response.write('Ciao')
   response.end()
   */

   const proxy_request = http.request(request.url,{
      method: request.method,
      headers:request.headers
   })


   // RICHIESTA A (browser client ) -> B(proxy server) -> C (google)
   request.addListener('data',function(chunk){
      proxy_request.write(chunk,'binary')
   })

  request.addListener('end',function(){
      proxy_request.end()
   })

   
   // RICHIESTA A (browser client ) <- B(proxy server) <- C (google)
   proxy_request.addListener('response',function(proxy_response){
      console.log("Ho stabilito una connesione https con l'ulr richiesto")
      response.writeHead(proxy_response.statusCode,proxy_response.headers)
      proxy_response.addListener('data',function(chunk){
         //ho ricevuto un "pezzo" della pagina
         response.write(chunk,'binary')
      })
      proxy_response.addListener('end',function(){
         response.end()
      })
   })
})

server.listen(8080)
console.log('Server Avviato sulla porta 8080')

// curl https://localhost:8080

// curl -x https://localhost:8080 https://www.google.com