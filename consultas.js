const { Pool } = require ( "pg" );

const config={
    user: "postgres" ,
    host: "localhost" ,
    password: "13991987Ft" ,
    database: "repertorio",
    port: 5432 ,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

// funcion para agregar un nuevo repertorio a la BD
const insertar = async (datos) => {
    // datos=[ 'A dios le pido', 'Juanes', 'Em' ]
    const consulta={
        text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3)",
        values: datos
    };
    try{
    const result = await pool.query( consulta );
    return result;
    }catch(e){
        console.log(e.code)
        return e
    }
};

//funcion para consultar todas las canciones en la BD y pintarlas en el HTML
const consultar=async ()=>{
    try {
        const result = await pool.query( "SELECT * FROM repertorio;" );
        return result.rows;
        } catch (error) {
        console .log(error.code);
        return error
        }
};
//funcion para editar un registro por id
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *` ,
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console .log(error);
        return error;
    }
};
//funcion para eliminar un registro del repertorio
const eliminar = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id =${id};`);
        return result;
    } catch (error) {
        console .log(error.code);
        return error;
    }
};

module.exports={insertar, consultar, editar, eliminar}