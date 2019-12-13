const tls = require("tls")
const fs = require("fs")


// Inizializzano la connessione

// 1. Genero la chiave privata del server
    // openssl genrsa -out cert.key 2048

// 2. Creo dalla chiave privata una richiesta di certificato
    // openssl req -new -key cert.key -out cert.csr
//--- Caso Certificate Authority Esterna
    // 3. Giro la richiesta a un CA (Autorità di Certificazione)

// 4. La CA verifica che voi siate il proprietario del dominio web per il quale state generando il certificato (Common Name)
    // postmaster@nomedominio.com -> Click sul link verifica la proprietà del dominio
    // Tramite aggiunta di record DNS ()
    // Verifica l'esistenza dell'azienda nel caso di Green Bar

// 5. La CA vi ritorna il vostro certificato pubblico (Chain)


//--- Certificate Authority Creata da noi
// Creo la chiave segreta
//openssl genrsa -des3 -out rootCA.key 4096
// Creo il certificato pubblico
//openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt

// Stampo la richiesta per verificare che sia tutto ok
//openssl req -in cert.csr -noout -text

// Verifico la richiesta fatta
//openssl x509 -req -in cert.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out cert.crt -days 500 -sha256 



const options = {
    key: fs.readFileSync('cert.key'), // private key 
    cert: fs.readFileSync('cert.crt') //public key
}

tls.createServer(options,function(s){
    console.log('Socket')
    //s.write("Welcome!")
    s.pipe(s)
}).listen(8080)

