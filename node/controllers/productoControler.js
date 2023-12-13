import multer from "multer"
import ProductoModel from "../models/ProductoModel.js"

import { Op } from 'sequelize';

ProductoModel.sync()
  .then(() => {
    console.log('Modelo sincronizado con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}` )
    }
})

const upload = multer({ storage: storage }).single('imagen');

//subir archivos


export const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            return res.status(500).json({ mensaje: error });
        }
        next();
    });
};

//crear producto 

export const nuevoProducto = async (req, res, next) => { 

    const producto = new ProductoModel(req.body)

    try {
        // Almacenar producto
        producto.imagen = req.file.filename;
        await producto.save();
        res.json({ mensaje: 'Producto nuevo' });
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        res.status(500).json({ mensaje: 'Error al guardar el producto' });
    }
}

//traer productos 

export const listaProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll({})
        res.json(productos);
    } catch (error) {
        res.json({mensaje: 'Error al mostrar productos'})
        console.log(error)
    }
}

//traer productos por id

export const mostrarProductoId = async (req, res) => {
    try {
        const producto = await ProductoModel.findAll({
            where: { id: req.params.idProducto }
        });
        console.log(req.params);

        res.json(producto[0]);
    } catch (error) {
        res.json({ mensaje: "error" });
    }
};

//Editar producto id 

export const actualizarProductoId = async (req, res, next) => {
    const { idProducto } = req.params;

    try {
        // Construir un nuevo producto con los datos del cuerpo de la solicitud
        const nuevoProducto = {
            ...req.body,
            imagen: req.file ? req.file.filename : undefined, // Actualizar imagen si se proporciona un nuevo archivo
        };

        // Buscar el producto por su ID
        const producto = await ProductoModel.findByPk(idProducto);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado', status: 404 });
        }

        // Actualizar el producto con los nuevos datos
        await producto.update(nuevoProducto);

        res.json({
            producto,
            mensaje: 'Producto actualizado',
            status: 200,
        });
    } catch (error) {
        console.error(error);
        next();
    }
};



//Deslistar Producto

export const deslistarProductoId = async (req, res, next) => {
    const { idProducto } = req.params;

    try {
         // Buscar el producto por su ID
        const producto = await ProductoModel.findByPk(idProducto);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado', status: 404 });
        }
        producto.disponibilidad = false;
        await producto.save(); 
        res.json({
                mensaje: 'Producto eliminado',
                status: 200,
            });
    
    } catch(error) {
        console.error(error);
        next();
    }

}

export const buscarProductoId = async (req, res, next) => {
    try {
        const { query } = req.body;  // Cambiado de req.params a req.body
        console.log('Cadena de búsqueda:', query);

        const productos = await ProductoModel.findAll({
            where: {
                nombreProducto: {
                    [Op.like]: `%${query}%`,
                },
                disponibilidad: true,
            },
            collate: 'utf8mb4_general_ci',
        });

        console.log('Resultados de la búsqueda:', productos);

        res.json(productos);
    } catch (error) {
        console.log('Error en la búsqueda:', error);
        next();
    }
};


