import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
//Importamos la configuracion de Axios 
import clienteAxios from '../../config/axios'


import Cliente from './Cliente';



const Clientes = () => {

  const [clientes, setClientes] = useState([]);

  //Query a la API 
  const  consultarApi = async () =>{
    const consultaDeCliente = await clienteAxios.get('/clientes');
    setClientes(consultaDeCliente.data);
  };
  useEffect ( () => {
    consultarApi();
  },[]);



  return (
    <>
      <h2>Clientes</h2>
      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className='listado-clientes'>
        {clientes.map(cliente => (
          <Cliente
            key={cliente.id}
            cliente={cliente}
            consultarApi={consultarApi}
          />
        ))}
      </ul>
    </>
  )
}

export default Clientes