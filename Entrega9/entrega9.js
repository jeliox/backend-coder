//Esta sera la entrega 9

const express = require('express')
const fs = require('fs');
const app = express()
const PORT= 8080;
const datos = fs.readFileSync('productos.txt','utf-8')
const array = JSON.parse(datos)

app.use(express.json())
app.use(express.urlencoded())

const apirouter = require('./api')

//Lista de productos
let productos =[...array]
//Ruta para listar los productos
app.use('/',apirouter)
app.use('/productos',apirouter)

//Escucha del puerto...
app.listen(PORT,()=> console.log(`Se está escuchando el puerto ${PORT}`));
