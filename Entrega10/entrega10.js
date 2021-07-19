//Esta sera la entrega 9

const express = require('express');
const exphbs = require('express-handlebars')
const fs = require('fs');
const datos = fs.readFileSync('productos.txt','utf-8')
const array = JSON.parse(datos)
const app = express()
const PORT= 8080;
let productos =[...array]
app.use(express.json())
app.use(express.urlencoded())


//llamadas a los handle bars
app.engine('handlebars',exphbs());

app.set('views','./views')

app.set('view engine','handlebars');

// Get de los productos

app.get('/productos',(req,res)=> {

    res.render('productos',{productos: productos})
})

//GET para agregar
app.get('/productos/nuevo',(req,res)=> {

    res.render('agregar')
})


// LLamado del POST
app.post('/productos/nuevo',(req,res)=>{
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
app.listen(PORT,()=> console.log(`Se está escuchando el puerto ${PORT}`));
