// Esta ser la entrega de Express avando parte 1

const express = require('express')
const bodyParser = require('body-parser')


const app = express()
var bparser = bodyParser.urlencoded()
const PORT= 8080;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.listen(PORT,()=> console.log(`Se está escuchando el puerto puerto ${PORT}`));
//Lista de productos
let productos =[
    {   "id": 1,
        "title": "Iphone",
        "precio": 900,
        "thumbnail": "aqui va el url de la imagen"

    },
    {   "id": 2,
        "title": "Samsung",
        "precio": 1899,
        "thumbnail": "aqui va el url de la imagen"

    }
    
]
//Ruta para listar los productos
app.get('/api/productos',(req,res)=>{
    if (productos == true){
        console.log('enviado el cliente')
        res.send(productos)
    }
        
    else {
        let err=  {error : 'producto no encontrado'}
        res.send(err)
    }
       

})
//Ruta para listar por el ID
app.get('/api/productos/:id',(req,res)=>{
    
        
        let output = productos.find(prod => prod.id == req.params.id)
        console.table(output)
        if (output == true){
            console.log('enviado el cliente por el ID')
            res.send(output)
        }else{
            let err = {error : 'no hay productos cargados'}
            res.send(err)
        }
       
})
//Ruta para adjuntar prodcuto
app.post('/api/productos/',(req,res)=>{
    
    let nuevoproducto = req.body;
    console.log(nuevoproducto)
    productos.push(nuevoproducto)
    console.table(productos)
    res.send(`Se agrego el producto:
    
            ${JSON.stringify(nuevoproducto)}`)
})