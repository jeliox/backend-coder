// Aqui haremos la rutas con router
const express = require('express')
const fs = require('fs');
const router = express.Router();
const datos = fs.readFileSync('productos.txt','utf-8')
const array = JSON.parse(datos)

let productos =[...array]
// las distintad rutas
router.get('/',(req,res)=>{
    res.send('probando')
})
router.get('/productos',(req,res)=>{
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
router.get('/productos/:id',(req,res)=>{
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
router.post('/productos/',(req,res)=>{

let nuevoproducto = req.body;
let control = Object.keys(nuevoproducto).length;
if (control > 0){
    let idN = productos.length + 1;
    console.log(nuevoproducto)
        let add = {
            "id": idN,
            "title": nuevoproducto.title,
            "price": nuevoproducto.price,
            "thumbnail": nuevoproducto.thumbnail,
            
        };
    console.log(add)
    productos.push(add)
    let addtoJson = JSON.stringify(productos,null,'\t')
    let dato =  fs.writeFileSync('productos.txt',addtoJson);
    res.send(`Se agrego el producto:
    
            ${JSON.stringify(nuevoproducto)}`)
} else {
    let err = {error : 'No se pudo cargar el producto'}
    res.send(err)
}

})

// Ruta modificar el producto por ID
router.put('/productos/:id',(req,res)=>{   
let output = productos.findIndex(prod => prod.id == req.params.id)
console.log(output)
if (output != undefined ){
    console.log('enviado al cliente por el ID')
    productos[output]= req.body;
    console.log(productos)
    let addtoJson = JSON.stringify(productos,null,'\t')
    let dato =  fs.writeFileSync('productos.txt',addtoJson);
    console.table(productos[output])
    res.send(productos[output])
}else{
    let err = {error : 'No se pudo cargar el producto'}
    res.send(err)
}

})

// Ruta para borra producto 
router.delete('/productos/:id',(req,res)=>{   
    let output = productos.findIndex(prod => prod.id == req.params.id)
    console.log(output)
    if (output != -1 ){
        console.log('enviado al cliente por el ID')
        let borrado = productos[output]
        productos.splice(output,1);
        let addtoJson = JSON.stringify(productos,null,'\t')
        let dato =  fs.writeFileSync('productos.txt',addtoJson);
        console.table(productos)
        res.send(borrado)
    }else{
        let err = {error : 'No se pudo borrar el producto'}
        res.send(err)
    }

})

module.exports = router;