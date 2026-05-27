//Importamos la clase Pool del paquete pg

const { Pool } = require("pg");

//Creamos una instancia de la clase Pool usando un objeto de configuración con las credenciales

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1154",
  database: "likeme",
  allowExitOnIdle: true,
});

//Función asíncrona para obtener los posts de la base de datos
const obtenerPosts = async () => {
  //Desestructuramos la respuesta y sólo capturamos el objeto "rows" que contiene los datos de la consulta
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");
  return rows; //Devolvemos el objeto rows con los datos de la consulta
};

//Función para agregar posts asíncrona que recibe 3 parámetros para insertar post
const agregarPost = async (titulo, url, descripcion) => {
  //Realizamos la consulta de SQL con datos parametrizados con "$" y RETURNING * para devolver el registro creado
  const consulta = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, 0) RETURNING *;";
  const values = [titulo, url, descripcion]; //Parámetros recibidos en la función que se insertan en los valores parametrizados
  const result = await pool.query(consulta, values); //Respuesta de la consulta
  return result.rows[0]; //Devolvemos el objeto creado en la base de datos
};

//Función para agregar likes (modifica registros en tabla de pg)
const agregarLike = async (id) => {
  //Realizamos la consulta de SQL donde buscamos el registro mediante el ID y le sumamos 1 a los likes existentes
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const values = [id]; //Parámetros recibidos en la función que se insertan en los valores parametrizados
  const result = await pool.query(consulta, values); //Respuesta de la consulta
  return result.rows[0]; //Devolvemos el objeto modificado
};

//Función para borrar posts de la base de datos
const borrarPost = async (id) => {
  //Realizamos la consulta de SQL donde buscamos el registro mediante el ID y lo borramos
  const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id]; //Parámetros recibidos en la función que se insertan en los valores parametrizados
  const result = await pool.query(consulta, values); //Respuesta de la consulta
  return result.rowCount; //Devolvemos la cantidad de registros borrados
};

module.exports = { obtenerPosts, agregarPost, agregarLike, borrarPost };
