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
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows; //Devolvemos el objeto rows con los datos de la consulta
};

//Función para agregar posts asíncrona que recibe 3 parámetros para insertar post
const agregarPost = async (titulo, img, descripcion) => {
  //Realizamos la consulta de SQL con datos parametrizados con "$"
  const consulta = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, 0);";
  const values = [titulo, img, descripcion]; //Parámetros recibidos en la función que se insertan en los valores parametrizados
  const result = await pool.query(consulta, values); //Respuesta de la consulta
};

module.exports = { obtenerPosts, agregarPost };
