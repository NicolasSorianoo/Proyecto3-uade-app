import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {

  const navigate = useNavigate()

//Obtener el ID
  const {id} = useParams();

  const [producto, setProducto] = useState({
    nombreProducto: '',
    precio: '',
    imagen: ''
  });
  const [archivo, setArchivo] = useState('');

//Consulta a la API para traer el producto para editarlo 

  const consultarApi = async ( ) => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    setProducto(productoConsulta.data);
  }

  useEffect(()=> {
    consultarApi();
  },[])

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

//Edita un producto en la BD 

  const editarProducto = async e => {
    e.preventDefault();
    //crear un formdata 
  const formData = new FormData();
  formData.append('nombreProducto',producto.nombreProducto);
  formData.append('precio',producto.precio);
  formData.append('imagen',archivo);

  //almacenarlo en la BD
  try {
    const res = await clienteAxios.put(`/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    //Lanzar aleta
    if(res.status === 200){
      console.log(res)
      Swal.fire({
        title: "Se edito correctamente!",
        text: "Presiona ok para continuar",
        icon: "success"
      }).then(() => {
          //Redirigir al usuario a la ruta /clientes después de mostrar el mensaje de éxito
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


//Extraer los valores de state
  const {imagen} = producto


  return (
    <>
      <h2>Editar productos</h2>

      <form onSubmit={editarProducto}>
      <legend>Llena todos los campos</legend>

      <div className="campo">
        <label>Nombre:</label>
        <input  type="text" 
                placeholder="Nombre Producto" 
                name="nombreProducto"
                onChange={leerInfoProductos}
                value={producto.nombreProducto}
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
                value={producto.precio}
                />
      </div>

      <div className="campo">
        <label>Imagen:</label>
        {
          imagen ? (
            <img src={`http://localhost:8000/${producto.imagen}`} alt={`Imagen de ${producto.nombreProducto}`} width="50"  />
          ) : (
            null
          )
        }
        <input  type="file"  
                name="imagen" 
                onChange={leerArchivo}
                />
      </div>

      <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Editar Producto"/>
      </div>
    </form>
    </>
  )
}

export default EditarProducto