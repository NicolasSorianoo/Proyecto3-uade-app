
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
//Importamos la configuracion de Axios 
import clienteAxios from '../../config/axios'
import Proovedor from './Proovedor';

const Proovedores = () => {

    const [proovedores, setProovedores] = useState([]);

  //Query a la API 
    const  consultarApi = async () =>{
    const consultaDeCliente = await clienteAxios.get('/proovedores');
    setProovedores(consultaDeCliente.data);
    };
    useEffect ( () => {
    consultarApi();
    },[]);



return (
    <>
        <h2>Proovedores</h2>
        <Link to="/proovedores/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Nuevo Proovedor
        </Link>
        <ul className='listado-clientes'>
            {proovedores.map(proovedor => (
                <Proovedor
                    key={proovedor.id}
                    proovedor={proovedor}
                    consultarApi={consultarApi}
                />
            ))}
        </ul>
    </>
)
}

export default Proovedores