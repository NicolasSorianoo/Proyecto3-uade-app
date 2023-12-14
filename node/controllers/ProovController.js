import ProovModel from "../models/ProovModel.js";


//MOstrar todos los proovedores
export const mostrarProov = async (req, res) => {
    try {
        const proov = await ProovModel.findAll()
        res.json(proov);
    } catch (error) {
        res.json({mensaje: 'Error al mostrar proovedores'})
    }
}

//Mostrar un proovedor por id

export const mostrarProovPorId = async (req, res) => {
    try {
        const proov = await ProovModel.findAll({where:{id:req.params.idProovedor}})
        res.json(proov);
    } catch (error) {
        res.json({mensaje: 'Error al mostrar un proovedor'})
    }
}

//Crear un proovedor

export const nuevoProovedor = async (req, res) => {
    try {
        await ProovModel.create(req. body);
        res.json({mensaje: 'El proovedor fue registrado!'})
    } catch (error) {
        res.json({mensaje: error.message})
    }
}


//Eliminar un Proovedor 

export const eliminarProovedor = async (req, res) => {
    try {
        await ProovModel.destroy({where: {id: req.params.idProovedor}});
        res.json({mensaje: 'El proovedor fue eliminado'})
    } catch (error) {
        res.json({mensaje:error.mensaje})
    }
}