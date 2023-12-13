import PedidoModel from '../models/PedidoModel.js';
import ProductoModel from '../models/ProductoModel.js';
import ClienteModel from '../models/ClienteModel.js';
import ProductopedidoModel from '../models/ProductoPedidoModel.js';


export const crearPedido = async (req, res) => {
    try {
        const { total, id_cliente, productos } = req.body;

      // Crear el pedido
        const nuevoPedido = await PedidoModel.create({
        total,
        id_cliente,
        });

      // Asociar productos al pedido
        const asociacionesProductos = productos.map(async (producto) => {
            const { id_producto, cantidad } = producto;
            await ProductopedidoModel.create({
                id_pedido: nuevoPedido.id_pedido,
                id_producto,
                cantidad,
            });
        });
      // Ejecutar todas las asociaciones en paralelo
            await Promise.all(asociacionesProductos);
            return res.status(201).json({ mensaje: 'Pedido creado exitosamente.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al crear el pedido' });
    }
};



export const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await PedidoModel.findAll({
            include: [
                {
                    model: ClienteModel,
                    as: 'cliente',
                },
                {
                    model: ProductoModel,
                    as: 'productos',
                    through: { attributes: ['cantidad'] },
                },
                // {
                //     model: ProductopedidoModel,
                //     as: 'cantidad',
                //     through:{ attributes: [] },
                // }
            ],
        });
        console.log(pedidos)
        return res.status(200).json({ pedidos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener los pedidos' });
    }
};

export const obtenerPedidoPorId = async (req, res) => {
    try {
        const { idPedido } = req.params;
        if (!idPedido || isNaN(idPedido)) {
            return res.status(400).json({ mensaje: 'El parámetro "id" debe ser un número válido.' });
        }
        // Buscar el pedido por ID
        const pedido = await PedidoModel.findByPk(idPedido, {
            include: [
                {
                    model: ProductoModel,
                    as: 'productos',
                    through: { attributes: [] }, // Esto evita que se incluyan las columnas adicionales de la tabla intermedia
                },
            ],
        });
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
        }
        return res.status(200).json({ pedido });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener el pedido.' });
    }
};

export const editarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const { total, id_cliente, productos } = req.body;
        if (!total || isNaN(total) || total <= 0) {
            return res.status(400).json({ mensaje: 'El campo "total" es obligatorio y debe ser un número mayor que cero.' });
        }
        // Buscar el pedido por ID
        const pedidoExistente = await PedidoModel.findByPk(idPedido);
        if (!pedidoExistente) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
        }
        // Actualizar los datos del pedido
        await pedidoExistente.update({
            total,
            id_cliente,
        });
        // Si también estás actualizando los productos del pedido
        if (productos && productos.length > 0) {
            // Desasociar los productos existentes
            await pedidoExistente.removeProductos();
            // Asociar los nuevos productos al pedido
            await pedidoExistente.addProductos(productos);
        }
        // Consultar los productos asociados al pedido después de la actualización
        const productosAsociados = await pedidoExistente.getProductos();
        return res.status(200).json({ mensaje: 'Pedido actualizado con éxito', pedido: pedidoExistente, productos: productosAsociados });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al editar el pedido' });
    }
};


export const borrarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        // Buscar el pedido por ID
        const pedidoExistente = await PedidoModel.findByPk(idPedido);
        if (!pedidoExistente) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
        }
        // Borrar el pedido por ID
        await pedidoExistente.destroy();
        return res.status(200).json({ mensaje: 'Pedido borrado con éxito' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al borrar el pedido' });
    }
};



