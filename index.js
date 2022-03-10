const http = require ( "http" );
const fs=require('fs');
const url = require ( "url" );
const {insertar, consultar, editar, eliminar}=require('./consultas.js');

http.createServer(async (req, res) => {
// ruta para cargar la pagina HTML en localhost:3000/
    if (req.url == "/" && req.method === "GET" ) {
        res.setHeader( "content-type" , "text/html" );
        res.end( fs.readFileSync( "index.html" , "utf8" ));
    }

//ruta para insertar en la base de datos
    if((req.url=='/cancion' && req.method === "POST")){
        let body=''
        req.on('data',(chunk) => {
            body+=chunk
        });
        req.on('end', async()=>{ 
            const datos = Object.values(JSON.parse(body));
            // datos=[ 'A dios le pido', 'Juanes', 'Em' ]
            const respuesta = await insertar(datos);
            res.end(JSON.stringify(respuesta));
        })
    }
// ruta para leer todos desde la base de datos y pintar en HTML
    if((req.url=='/canciones' && req.method === "GET")){
        const registros = await consultar();
        res.end(JSON.stringify(registros));    
    }

//ruta para editar un registro (incluí id en el envio desde el frontEnd)
    if (req.url == "/cancion" && req.method == "PUT" ) {
        let body = "" ;
        req.on( "data" , (chunk) => {
            body += chunk;
        });
        req.on( "end" , async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await editar(datos);
            res.end(JSON.stringify(respuesta));
        });
    };
//Ruta para eliminar un registro
    if (req.url.startsWith("/cancion") && req.method == "DELETE" ) {
        const { id } = url.parse(req.url, true ).query;
        const respuesta = await eliminar(id);
        res.end(JSON.stringify(respuesta));
    }

}).listen( 3000, ()=>{ console.log(`Servidor escuchando en el puerto 300 con PID: ${process.pid}`)} );