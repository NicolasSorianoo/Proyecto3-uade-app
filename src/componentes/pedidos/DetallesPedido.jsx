import React from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const DetallesPedido = ({ pedido, consultarApi }) => {
    const { cliente, productos} = pedido;
    
    const eliminarPedido = async (idPedido) => {

    Swal.fire({
        title: "¿Estas Seguro?",
        text: "Los datos eliminados no se pueden recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, ELIMINALO!",
        cancelButtonText: "CANCELAR"

    }).then((result) => {
        if (result.isConfirmed) {
            clienteAxios.delete(`/pedidos/${idPedido}`)
            .then(res=>{
                console.log(res)
            })
            Swal.fire({
            title: "Eliminado!",
            text: "El cliente a sido eliminado.",
            icon: "success"
            })
            .then(consultarApi())
        }
    });
}

return (
    <li className="pedido">
        <div className="info-pedido">
            <p className="id">ID: </p>
            <p className="nombre">Cliente: {cliente.nombreCliente} {cliente.apellidoCliente}</p>

        <div className="articulos-pedido">
            <p className="productos">Artículos Pedido: </p>
            <ul>
                {productos.map(articulo => (
                    <li key={articulo.id}>
                        <p>{articulo.nombreProducto}</p>
                        <p>${articulo.precio}</p>
                        <p>Cantidad: {articulo.productos_pedidos.cantidad}</p>
                    </li>
                    ))}
            </ul>
        </div>
        <p className="total">Total: ${pedido.total} </p>
        </div>
        <div className="acciones">
            <button type="button" className="btn btn-rojo btn-eliminar" onClick={()=> eliminarPedido(pedido.id_pedido)}>
                <i className="fas fa-times"></i>
                    Eliminar Pedido
            </button>
        </div>
    </li>
);
};

export default DetallesPedido;