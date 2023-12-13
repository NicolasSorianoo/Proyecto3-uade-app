import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

const NuevoCliente = () => {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nombreCliente: '',
        apellidoCliente: '',
        correoCliente: '',
        telefonoCliente: ''
    })
    //Leer los datos del formulario
    const actualizarElState = e => {
        //almacenar lo que el usuario escribe en el State
        setCliente({
        //Obtener una copia del state
            ...cliente, [e.target.name] : e.target.value 
        })
        console.log(cliente)
    }

// Validacion de formulario

    const validarCliente = () => {
        const {id, nombreCliente, apellidoCliente, correoCliente, telefonoCliente} = cliente;

        //revisamos el contenido de los campos
        let validacion = !nombreCliente.length || !apellidoCliente.length || !correoCliente.length || !telefonoCliente.length  

        return validacion
    }

// Añadir un cliente nuevo a la API 

    const agregarCliente = e => {
        e.preventDefault();
        clienteAxios.post('/clientes',cliente)
        
        .then( res => {
            //Validacion para que no se repita el correo
            if(res.data.name === "SequelizeUniqueConstraintError") {
                Swal.fire({
                    type: "error",
                    title: "Hubo un error",
                    text: "Ese correo ya existe",
                    icon: "error"
                });
                
            } else {
                Swal.fire({
                    title: "Cliente Agregado!",
                    text: "Pulse ok para continuar",
                    icon: "success"
                }).then(() => {
                    // Redirigir al usuario a la ruta /clientes después de mostrar el mensaje de éxito
                    navigate('/clientes');
                });
            }
            console.log(res)
        }) 
    }


return (
    <>
        <h2>Nuevo cliente</h2>
            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombreCliente"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellidoCliente"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="correoCliente"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefonoCliente"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Cliente"
                                disabled = {validarCliente()}
                                />
                </div>
            </form>
    </>    
    )
}

export default NuevoCliente