//Usaremos el servidor express
import express from 'express'
import fs from 'fs'


//Lectura del archivo con los productos
const datos = await fs.promises.readFile('productos.txt','utf-8');
const array = JSON.parse(datos);
const app = express();
//Definicion del puerto y los contadores

let PORT = 8080;
let counter1 = 0;
let counter2 = 0;


// Prueba de respuesta al servidor
const server  = app.listen(PORT, ()=>{
    console.log('Responde')
})
// Creamos la Ruta Raiz
app.get('/',(req,res)=>{
    let html = ` <html>
                    <body>
                        <h1>Probando el servidor, Bienvenido</h1>
                    </body>
                </html>
                `
    res.send(html)
})
//Creamos la ruta items
const productos = [];
for (var i=0; i < array.length; i++) {
    productos.push(array[i].title)
}
app.get('/items',(req,res)=>{
   
    let obj = {
        "items": productos,
        "cantidad": array.length
    };

    let objjson = JSON.stringify(obj);
    counter1++
    res.send(`Lo solicitado es lo siguiente: ${objjson}`)
    
})
//Cremaos la ruta item-random

app.get('/item-random',(req,res)=>{
    let randomNumber = (Math.floor(Math.random() * (array.length - 0)));
    let obj = {
        "item": array[randomNumber]
    };

    let objjson = JSON.stringify(obj);
    counter2++
    res.send(`Lo solicitado es lo siguiente: ${objjson}`)
    
})

// Hacemos la ruta de visitas
app.get('/visitas',(req,res)=>{
    let obj = {
        "visitas": {
            "items": counter1,
            "item": counter2
        } 
    };

    let objjson = JSON.stringify(obj);
    
    res.send(`Lo solicitado es lo siguiente: ${objjson}`)
    
})
