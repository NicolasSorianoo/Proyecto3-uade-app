import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

const EditarCliente = (props) => {
//Obtener id
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();
    const [cliente, datosCliente] = useState({
        nombreCliente: '',
        apellidoCliente: '',
        correoCliente: '',
        telefonoCliente: '',
    })
//Conultar a la API 
    const consultarApi = async() => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`)
        datosCliente(clienteConsulta.data);
    }

//UseEfect, cuando carga el componente
    useEffect (()=>{
        consultarApi()
    },[])



//Leer los datos del formulario
    const actualizarElState = e => {
        //almacenar lo que el usuario escribe en el State
        datosCliente({
        //Obtener una copia del state
            ...cliente, [e.target.name] : e.target.value 
        })
        
    }

//Actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();
        clienteAxios.put(`/clientes/${cliente.id}`,cliente)
        .then(res=>{
            if(res.data.name === "SequelizeUniqueConstraintError") {
                Swal.fire({
                    type: "error",
                    title: "Hubo un error",
                    text: "Ese correo ya existe",
                    icon: "error"
                });
                
            } else {
                Swal.fire({
                    title: "Exito al guardar cambios!",
                    text: "Pulse ok para continuar",
                    icon: "success"
                }).then(() => {
                    // Redirigir al usuario a la ruta /clientes después de mostrar el mensaje de éxito
                    navigate('/clientes');
                });
            }
        })
    }

// Validacion de formulario
    const validarCliente = () => {
        const {nombreCliente, apellidoCliente, correoCliente, telefonoCliente} = cliente;
        //revisamos el contenido de los campos
        let validacion = !nombreCliente.length || !apellidoCliente.length || !correoCliente.length || !telefonoCliente.length  
        return validacion
    }


    return (
    <>
    <h2>Editar cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente " 
                            name="nombreCliente"
                            onChange={actualizarElState}
                            value={cliente.nombreCliente}
                            />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellidoCliente"
                            onChange={actualizarElState}
                            value={cliente.apellidoCliente}
                            />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="correoCliente"
                            onChange={actualizarElState}
                            value={cliente.correoCliente}
                            />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefonoCliente"
                            onChange={actualizarElState}
                            value={cliente.telefonoCliente}
                            />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Guardar Cambios"
                                disabled = {validarCliente()}
                                />
                </div>
            </form>
    </>
)
}

export default EditarCliente