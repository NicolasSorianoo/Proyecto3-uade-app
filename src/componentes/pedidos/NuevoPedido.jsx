import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import FormProducto from './FormProducto';
import FormCantidad from './FormCantidad';

const NuevoPedido = (props) => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [cliente, setCliente] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
    const consultarApi = async () => {
        const resultado = await clienteAxios.get(`/clientes/${id}`);
        setCliente(resultado.data);
    };

    consultarApi();
    actualizarPago();
    }, [productosEncontrados]);

    const buscarProducto = async (e) => {
    e.preventDefault();
    if (busqueda.trim() === '') {
        Swal.fire({
        type: 'error',
        title: 'Campo vacío',
        text: 'Por favor, ingresa un término de búsqueda.',
        });
        return;
    }

    try {
        const resultadoBusqueda = await clienteAxios.post('/productos/busqueda', {
        query: busqueda,
        });

        if (resultadoBusqueda.data[0]) {
        let productoResultado = resultadoBusqueda.data[0];
        productoResultado.producto = resultadoBusqueda.data[0].id;
        productoResultado.cantidad = 0;
        setProductosEncontrados([...productosEncontrados, productoResultado]);
        } else {
        Swal.fire({
            type: 'error',
            title: 'No hay resultados',
            text: 'No hay resultado',
        });
        }
    } catch (error) {
        console.log(error);
    }
    };

    const leerDatos = (e) => {
    e.preventDefault();
    setBusqueda(e.target.value);
    };

    const aumentarCant = (i) => {
    const todosLosProductos = [...productosEncontrados];
    todosLosProductos[i].cantidad++;
    setProductosEncontrados(todosLosProductos);
    };

    const restarCant = (i) => {
    const todosLosProductos = [...productosEncontrados];
    if (todosLosProductos[i].cantidad === 0) return;
    todosLosProductos[i].cantidad--;
    setProductosEncontrados(todosLosProductos);
    };

    const actualizarPago = () => {
    if (productosEncontrados.length === 0) {
        setTotal(0);
        return;
    }
    let nuevoTotal = 0;
    productosEncontrados.forEach(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    );

    setTotal(nuevoTotal);
    };

    const eliminarProductoPedido = (id) => {
        const todosLosProductos = productosEncontrados.filter(producto => producto.id !== id);
        setProductosEncontrados(todosLosProductos);
    }


    const enviarPedidoAlServidor = async (e) => {
  try {
    e.preventDefault()
    // Preparar los datos del pedido
    const datosPedido = {
      total: total,
      id_cliente: cliente.id,
      productos: productosEncontrados.map(producto => ({
        id_producto: producto.id,  
        cantidad: producto.cantidad,
      })),
    };

    // Enviar el pedido al servidor
    const respuesta = await clienteAxios.post('/pedidos', datosPedido);
    

    if (respuesta.status === 201) {
      // Limpiar productosEncontrados y total después de un pedido exitoso
      setProductosEncontrados([]);
      setTotal(0);
      // Mostrar el SweetAlert después de limpiar los estados
      Swal.fire({
        icon: 'success',
        title: 'Pedido creado',
        text: 'El pedido se ha creado exitosamente.',
      }).then(navigate('/pedidos'))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el pedido.',
      });
    }
  } catch (error) {
    console.error('Error al enviar el pedido al servidor:', error);
  }
};


    return (
    <>
        <h2>Nuevo Pedido</h2>

        <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
            <span>Nombre:</span> {cliente.nombreCliente} {cliente.apellidoCliente}
        </p>
        <p>
            <span>Teléfono: </span>
            {cliente.telefonoCliente}
        </p>
        </div>

        <FormProducto 
        buscarProducto={buscarProducto} 
        leerDatos={leerDatos} 
        />

        <ul className="resumen">
        {productosEncontrados.map((productoEncontrado, index) => (
            <FormCantidad
            key={productoEncontrado.id}
            productoEncontrado={productoEncontrado}
            restarCant={restarCant}
            aumentarCant={aumentarCant}
            eliminarProductoPedido={eliminarProductoPedido}
            index={index}
            />
        ))}
        </ul>
        <p className="total">
        {' '}
        Total a pagar:<span>${total}</span>
        </p>
        {total > 0 ? (
            <form onSubmit={enviarPedidoAlServidor}>
            <input
                type="submit"
                className="btn btn-verde block"
                value="Realizar pedido"
            />
            </form>
        ) : null}
    </>
    );
};

export default NuevoPedido;