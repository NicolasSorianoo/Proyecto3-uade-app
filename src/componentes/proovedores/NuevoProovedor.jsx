import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

const NuevoProovedor = () => {
    const navigate = useNavigate();
    const [proovedor, setProovedor] = useState({
        nombreProov: '',
        correoProov: '',
        telefonoProov: ''
    })
    //Leer los datos del formulario
    const actualizarElState = e => {
        //almacenar lo que el usuario escribe en el State
        setProovedor({
        //Obtener una copia del state
            ...proovedor, [e.target.name] : e.target.value 
        })
        console.log(proovedor)
    }

// Validacion de formulario

    const validarProov = () => {
        const {nombreProov, correoProov, telefonoProov} = proovedor;

        //revisamos el contenido de los campos
        let validacion = !nombreProov.length || !correoProov.length || !telefonoProov.length  

        return validacion
    }

// Añadir un cliente nuevo a la API 

    const agregarProov = e => {
        e.preventDefault();
        clienteAxios.post('/proovedores',proovedor)
        
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
                    navigate('/proovedores');
                });
            }
            console.log(res)
        }) 
    }


return (
    <>
        <h2>Nuevo proovedor</h2>
            <form onSubmit={agregarProov}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Proovedor" 
                            name="nombreProov"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Proovedor" 
                            name="correoProov"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="tel" 
                            placeholder="Teléfono Proovedor" 
                            name="telefonoProov"
                            onChange={actualizarElState}
                            />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Proovedor"
                                disabled = {validarProov()}
                                />
                </div>
            </form>
    </>    
    )
}

export default NuevoProovedor