import ClienteModel from "../models/ClienteModel.js";
import PedidoModel from "../models/PedidoModel.js";

//Traer a todos los clientes 
export const mostrarClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll()
        res.json(clientes);
    } catch (error) {
        res.json({mensaje: 'Error al mostrar clientes'})
    }
}

//Traer a un cliente pot id
export const mostrarClienteId = async (req, res) => {
    try {
        const cliente = await ClienteModel.findAll({
            where:{id:req.params.idCliente}
        })
        res.json(cliente[0]);    
    } catch (error) {
        res.json({mensaje: error.mensaje})
    }
}

//Nuevo cliente via post
export const nuevoCliente = async (req, response) => {
    try {
        await ClienteModel.create(req.body)
        response.json({
            "message": "El registro fue creado correctamente"
        })
    } catch (error) {
        response.send(error)
        console.log(error)
    }
}

//Actualizar cliente via put
export const actualizarCliente = async (req, response) => {
    try {
        await ClienteModel.update(req.body, {
            where: { id: req.params.idCliente}
        })
        response.json({
            "message": "El registro fue actualizado correctamente"
        })
    } catch (error) {
        response.json({message: error.message})
        console.log(error)
    }
}

//Eliminar un cliente
export const eliminarCliente = async (req, response) => {
    try {
        await PedidoModel.destroy({
            where: {id_cliente: req.params.idCliente}
        })
        await ClienteModel.destroy({
            where: {id: req.params.idCliente}
            
        })
        response.json({
            "message": "El registro fue eliminado correctamente"
        })
    } catch (error) {
        response.json({message: error.message})
    }
}

