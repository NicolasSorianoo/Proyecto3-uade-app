import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Proovedor = ({proovedor, consultarApi}) => {

    const {id, nombreProov, correoProov, telefonoProov} = proovedor
//Eliminar Cliente
    const eliminarProovedor = async (idProovedor) => {

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
                clienteAxios.delete(`/proovedores/${idProovedor}`)
                .then(res=>{
                    console.log(res)
                })
                Swal.fire({
                title: "Eliminado!",
                text: "El cliente a sido eliminado.",
                icon: "success"
                }).then(consultarApi())
            }
        });
    }
return (
    <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombreProov}</p>
                        <p>Correo: {correoProov}</p>
                        <p>Telefono: {telefonoProov}</p>
                    </div>
                    <div className="acciones">
                        <button type="button" 
                                className="btn btn-rojo btn-eliminar"
                                onClick={()=> eliminarProovedor(proovedor.id)}
                                >
                            <i className="fas fa-times"></i>
                            Eliminar Proovedor
                        </button>
                    </div>
                </li>
    )
}

export default Proovedor