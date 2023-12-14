import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto.jsx';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const consultarApi = async () => {
    try {
      const response = await clienteAxios.get('/productos');
      setProductos(response.data);
      
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };
  useEffect(() => {
    consultarApi();
  }, []);

  return (
    <>
      <h2>Productos</h2>
      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i> Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto.id} producto={producto} consultarApi = {consultarApi} />
          
        ))}
        
      </ul>
    </>
  );
};

export default Productos;