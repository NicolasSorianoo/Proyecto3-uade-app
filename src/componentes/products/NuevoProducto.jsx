import React, { useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';


const NuevoProducto = () => {
  const navigate = useNavigate()
  const[producto, setProducto] = useState({
    nombreProducto: '',
    precio: ''
  });
//Archivos
  const [archivo, setArchivo] = useState('')

//Leer los datos del formulario 
  const leerInfoProductos = e => {
    setProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  } 


//Colocar la imagen en el archivo
  const leerArchivo = e => {
    setArchivo(e.target.files[0])
  }

//Almacenar el producto en la  base de datos 
const agregarProducto = async e => {
  e.preventDefault()

  //crear un formdata 
  const formData = new FormData();
  formData.append('nombreProducto',producto.nombreProducto);
  formData.append('precio',producto.precio);
  formData.append('imagen',archivo);

  //almacenarlo en la BD
  try {
    const res = await clienteAxios.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    //Lanzar aleta
    if(res.status === 200){
      Swal.fire({
        title: "Se agrego correctamente!",
        text: "Presiona ok para continuar",
        icon: "success"
      }).then(() => {
        // Redirigir al usuario a la ruta /clientes después de mostrar el mensaje de éxito
        navigate('/productos');
    });
    }
    
    
  } catch (error) {
    Swal.fire({
      type:'error',
      title:'Hubo un error',
      text:'Vuelva a intentarlo'
    })
  }
}

  return (
    <>
      <h2>Nuevo Producto</h2>

<form onSubmit={agregarProducto}>
    <legend>Llena todos los campos</legend>

    <div className="campo">
        <label>Nombre:</label>
        <input  type="text" 
                placeholder="Nombre Producto" 
                name="nombreProducto"
                onChange={leerInfoProductos}
                />
    </div>

    <div className="campo">
        <label>Precio:</label>
        <input  type="number" 
                name="precio" 
                min="0.00" 
                step="1" 
                placeholder="Precio"
                onChange={leerInfoProductos} 
                />
    </div>

    <div className="campo">
        <label>Imagen:</label>
        <input  type="file"  
                name="imagen" 
                onChange={leerArchivo}
                />
    </div>

    <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
    </div>
</form>
    </>
  )
}

export default NuevoProducto