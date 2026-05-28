const { obtenerPosts, agregarPost, agregarLike, borrarPost } = require("./consultas.js"); //Importamos las funciones del archivo consultas.js
const express = require("express"); //Importamos el paquete express
const cors = require("cors"); //Importamos el paquete cors
const app = express(); //Asignamos la instancia de express a la constante app
const puerto = 3000; //Definimos el puerto de escucha del servidor

//middlewares
app.use(cors()); //Habilitamos cors
app.use(express.json()); //Habilitamos el parseo de datos JSON

//Creamos el puerto de escucha
app.listen(puerto, console.log(`Servidor encendido escuchando puerto ${puerto}`));

//Rutas de consultas

//Ruta asíncrona para leer los posts de la base de datos
app.get("/posts", async (req, res) => {
  try {
    //Se usa try catch para manejar los errores
    const posts = await obtenerPosts(); //Llamamos la función obtenerPosts y guardamos el objeto de la respuesta en la constante "posts"
    return res.json(posts); //Respondemos al frontend el objeto "posts" en formato JSON para que el front pueda renderizar los posts
  } catch (error) {
    //Capturamos el error
    console.log(error); //Mostramos el error en consola
    return res.status(500).json({ message: "Internal server error" }); //Respondemos al frontend con el mensaje 500 y un mensaje en formato JSON
  }
});

//Ruta asíncrona para agregar un post a la base de datos
app.post("/posts", async (req, res) => {
  try {
    //Se usa try catch para manejar los errores
    const { titulo, url, descripcion } = req.body; //Capturamos los datos enviados en el body desde el frontend
    const nuevoPost = await agregarPost(titulo, url, descripcion); //Llamamos la función agregarPost con los datos extraídos del body como argumentos
    res.status(201).json(nuevoPost); //Respuesta al frontend con mensaje 201 y el post agregado en formato json
  } catch (error) {
    //Capturamos el error
    console.log(error); //Mostramos el error en consola
    return res.status(500).json({ message: "Internal server error" }); //Respondemos al frontend con el mensaje 500 y un mensaje en formato JSON
  }
});

//Ruta asíncrona para modificar posts (agregar likes)
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params; //Capturamos el ID del post mediante req.params
    const nuevoLike = await agregarLike(id); //Llamamos la función enviando el ID como parámetro
    res.status(201).json(nuevoLike); //Respuesta al frontend con mensaje 201 y el post agregado en formato json
  } catch (error) {
    //Capturamos el error
    console.log(error); //Mostramos el error en consola
    return res.status(500).json({ message: "Internal server error" }); //Respondemos al frontend con el mensaje 500 y un mensaje en formato JSON
  }
});

//Ruta asíncrona para borrar posts
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params; //Capturamos el ID del post mediante req.params
    await borrarPost(id); //Llamamos la función enviando el ID como parámetro
    res.status(200).json({ message: "Post eliminado con éxito" }); //Respuesta al frontend con mensaje 200 y mensaje en formato JSON
  } catch (error) {
    //Capturamos el error
    console.log(error); //Mostramos el error en consola
    return res.status(500).json({ message: "Internal server error" }); //Respondemos al frontend con el mensaje 500 y un mensaje en formato JSON
  }
});
