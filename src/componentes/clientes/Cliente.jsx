import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Cliente = ({cliente, consultarApi}) => {

    const {id, nombreCliente, apellidoCliente, correoCliente, telefonoCliente} = cliente
//Eliminar Cliente
    const eliminarCliente = async (idCliente) => {

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
                clienteAxios.delete(`/clientes/${idCliente}`)
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
    <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombreCliente} {apellidoCliente}</p>
                        <p>Correo: {correoCliente}</p>
                        <p>Telefono: {telefonoCliente}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>

                        <Link to={`/pedidos/nuevo/${id}`} className="btn btn-amarillo">
                            <i className="fas fa-plus"></i>
                            Nuevo pedido 
                        </Link>

                        <button type="button" 
                                className="btn btn-rojo btn-eliminar"
                                onClick={()=> eliminarCliente(id)}
                                >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    )
}

export default Cliente