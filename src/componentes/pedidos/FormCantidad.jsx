import React from 'react'

const FormCantidad = ({productoEncontrado, restarCant, aumentarCant, eliminarProductoPedido, index}) => {
  return (
    <li>
        <div className="texto-producto">
            <p className="nombre">{productoEncontrado.nombreProducto}</p>
            <p className="precio">{productoEncontrado.precio}</p>
        </div>
        <div className="acciones">
            <div className="contenedor-cantidad">
                <i  className="fas fa-minus"
                    onClick={()=> restarCant(index)}>

                </i>
                {productoEncontrado.cantidad}
                <i  className="fas fa-plus" 
                    onClick={()=> aumentarCant(index)}>

                </i>
            </div>
            <button type="button" className="btn btn-rojo" onClick={()=> eliminarProductoPedido(productoEncontrado.id)}>
                <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
            </button>
        </div>
    </li>
  )
}

export default FormCantidad