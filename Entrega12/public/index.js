// aqui estaremos del lado del cliente
const socket = io()
    
    socket.on('productos', data=>{
        
        let aver = data.map((prod) => {
            return `<tr> 
                        <td>${prod.title} </td>
                        <td>${prod.price}</td>
                        <td><img src="${prod.thumbnail}" width="25px" height="auto" alt=""></td>
                    </tr>`
        })
        console.table(aver)
        let table = document.getElementById('tabla');
        table.innerHTML= aver   
        socket.emit('notificacion', 'Mensaje recibido exitosamente')
    })
    
