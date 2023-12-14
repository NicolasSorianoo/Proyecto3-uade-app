import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Producto = ({producto, consultarApi}) => {
  
  //Eliminar un producto
  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, BORRALO!",
      cancelButtonText: "Cancelar"
      
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.put(`/productos-eliminar/${id}`)
        .then(res => {
          if(res.status === 200){
            Swal.fire({
              title: "Producto Eliminado!",
              text: "el producto a sido eliminado con exito",
              icon: "success"
            }).then(consultarApi())
          }
        })
      }
    });
  }

  const { id, nombreProducto, precio, imagen, disponibilidad } = producto;

  return (
    <>
      {disponibilidad ? (
        <li className="producto">
          <div className="info-producto">
            <p className="nombre">{nombreProducto}</p>
            <p className="precio">{precio} </p>
            {imagen ? (
              <img src={`http://localhost:8000/${imagen}`} alt={`Imagen de ${nombreProducto}`} />
            ) : (
              null
            )}
          </div>
          <div className="acciones">
            <Link to={`/productos/editar/${id}`} className="btn btn-azul">
              <i className="fas fa-pen-alt"></i> Editar Producto
            </Link>
            <button
              type="button"
              className="btn btn-rojo btn-eliminar"
              onClick={() => {
                eliminarProducto(id);
              }}
            >
              <i className="fas fa-times"></i> Eliminar Producto
            </button>
          </div>
        </li>
      ) : (
        null
      )}
    </>
  );
}

export default Producto



