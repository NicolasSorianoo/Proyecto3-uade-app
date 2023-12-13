import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

const Pedidos = ({productoEncontrado}) => {
  const [pedidos, setPedidos] = useState([]);

  const consultarApi = async () => {
    try {
      const respuesta = await clienteAxios.get('/pedidos');
      
      
      setPedidos(respuesta.data.pedidos);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  useEffect(() => {
    
    consultarApi();
  }, []);

  return (
    <>
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
        {pedidos.map((pedido) => (
          <DetallesPedido key={pedido.id_pedido} pedido={pedido} productoEncontrado={productoEncontrado} consultarApi={consultarApi} />
        ))}
      </ul>
    </>
  );
};

export default Pedidos;

