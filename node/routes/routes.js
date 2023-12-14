import express from 'express'
const router = express.Router()
import { mostrarClientes, nuevoCliente, mostrarClienteId, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js'
import { eliminarProovedor, mostrarProov, mostrarProovPorId, nuevoProovedor } from '../controllers/ProovController.js';
import { listaProductos, nuevoProducto, subirArchivo, mostrarProductoId,actualizarProductoId, deslistarProductoId, buscarProductoId } from '../controllers/productoControler.js';
import { crearPedido, obtenerPedidoPorId, obtenerPedidos, editarPedido, borrarPedido} from '../controllers/pedidoController.js';




router.get('/clientes', mostrarClientes);
router.get('/clientes/:idCliente',mostrarClienteId);
router.post('/clientes', nuevoCliente);
router.put('/clientes/:idCliente',actualizarCliente);
router.delete('/clientes/:idCliente', eliminarCliente);


router.get('/proovedores', mostrarProov);
router.get('/proovedores/:idProovedor', mostrarProovPorId);
router.post('/proovedores',nuevoProovedor);
router.delete('/proovedores/:idProovedor',eliminarProovedor);

router.post('/productos', subirArchivo, nuevoProducto)
router.get('/productos', listaProductos);
router.get('/productos/:idProducto', mostrarProductoId);
router.put('/productos/:idProducto', subirArchivo, actualizarProductoId);
router.put('/productos-eliminar/:idProducto', deslistarProductoId);
router.post('/productos/busqueda', buscarProductoId);

router.post('/pedidos', crearPedido);
router.get('/pedidos', obtenerPedidos); 
router.get('/pedidos/:idPedido', obtenerPedidoPorId);
router.put('/pedidos/:idPedido', editarPedido);
router.delete('/pedidos/:idPedido', borrarPedido);




export default router