//Esta sera la entrega 9

const express = require('express');
const exphbs = require('express-handlebars')
const fs = require('fs');
const datos = fs.readFileSync('productos.txt','utf-8')
const array = JSON.parse(datos)
const app = express()
const PORT= 8080;
let productos =[...array]
console.log(productos)
app.use(express.json())
app.use(express.urlencoded())

// <-------------- Formulario -----------------> 

//llamadas a los handle bars
app.engine('handlebars',exphbs());

app.set('views','./views')

app.set('view engine','handlebars');
// formualrio y tabla
app.get('/productos',(req,res)=>{
    res.render('busqueda')
    aBuscar= [req.body]
   
})

app.get('/productos',(req,res)=>{
    let output = productos.find(prod => prod.title == aBuscar.title)
    console.log(output)

    res.render('productos',{productos: productos})
})


//Escucha del puerto...
app.listen(PORT,()=> console.log(`Se está escuchando el puerto ${PORT}`));
