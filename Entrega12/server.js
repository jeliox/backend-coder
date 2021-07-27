//Esta sera la entrega 12

//llamado de modulos
const { concatSeries } = require('async');
const express = require('express');
const app = express()
const fs = require('fs');
const datos = fs.readFileSync('productos.txt','utf-8');
const http = require('http');
const server = http.createServer(app);
let io = require('socket.io')(server)

// cosas extras necesarias
const array = JSON.parse(datos)

const PORT= 3000;
// lectura de productos
let productos =[...array]
//otras cosas
app.use(express.json())
app.use(express.urlencoded())

// Llamado de las plantilla EJS
app.set('view engine','ejs');

// para los del index.js
// app.use(express.static('./public'))

// Get de los productos

app.get('/productos',(req,res)=> {
    res.render('productos',{productos: productos})
})

//GET para agregar
app.get('/',(req,res)=> {

    res.render('agregar')
})

// LLamado del POST
app.post('/',(req,res)=>{
    let nuevoproducto = req.body;
    console.log(nuevoproducto)
    let control = Object.keys(nuevoproducto).length;
    if (control > 0){
        let idN = productos.length + 1;
        console.log(nuevoproducto)
        const add = {
                "id": idN,
                "title": nuevoproducto.title,
                "price": nuevoproducto.price,
                "thumbnail": nuevoproducto.thumbnail, 
                }
        
    console.log(add)
    productos.push(add)
    let addtoJson = JSON.stringify(productos,null,'\t')
    let dato =  fs.writeFileSync('productos.txt',addtoJson);    
    console.log(nuevoproducto)
    }
    nuevoproducto = {};
    res.redirect('/productos')

})


//Escucha del puerto...

server.listen(PORT,()=>console.log(`Server on port ${PORT}`));

// prueba de socket
io.on('connection',(socket)=>{
    console.log('Usuario conectado')
    socket.emit('productos',productos)
})
