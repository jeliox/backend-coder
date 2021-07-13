//Esta sera la entrega 9

const express = require('express')
const app = express()
const PORT= 8080;
app.use(express.json())
app.use(express.urlencoded())

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

    },
    {   "id": 3,
        "title": "iPhone 12 Pro MAX",
        "precio": 1199,
        "thumbnail": "aqui va el url de la imagen"
    }
    
]
//Ruta para listar los productos
app.get('/api/productos',(req,res)=>{
    if (productos != undefined) {
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
        if (output != undefined){
            console.log('enviado el cliente por el ID')
            res.send(output)
        }else{
            let err = {error : 'no hay productos cargados'}
            res.send(err)
        }
       
})
//Ruta para adjuntar producto
app.post('/api/productos/',(req,res)=>{
    
    let nuevoproducto = req.body;
    let control = Object.keys(nuevoproducto).length;
    if (control > 0){
        
        productos.push(nuevoproducto)
        console.table(productos)
        res.send(`Se agrego el producto:
        
                ${JSON.stringify(nuevoproducto)}`)
    } else {
        let err = {error : 'No se pudo cargar el producto'}
        res.send(err)
    }
   
})

// Ruta modificar el producto por ID
app.put('/api/productos/:id',(req,res)=>{
    
        
    let output = productos.findIndex(prod => prod.id == req.params.id)
    console.log(output)
    if (output != undefined ){
        console.log('enviado al cliente por el ID')
        productos[output]= req.body;
        console.table(productos[output])
        res.send(productos[output])
    }else{
        let err = {error : 'No se pudo cargar el producto'}
        res.send(err)
    }
    
})

// Ruta para borra producto 
app.delete('/api/productos/:id',(req,res)=>{
    
        
    let output = productos.findIndex(prod => prod.id == req.params.id)
    console.table(output)
    if (output != undefined){
        console.log('enviado al cliente por el ID')
        let borrado = productos[output]
        console.table(productos)
        productos.splice(output,1);
        console.table(productos)
        res.send(borrado)
    }else{
        let err = {error : 'No se pudo borrar el producto'}
        res.send(err)
    }
   
})

//Escucha del puerto...
app.listen(PORT,()=> console.log(`Se está escuchando el puerto ${PORT}`));
