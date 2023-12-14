import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PedidoModel from "./PedidoModel.js";


const ProductoModel = db.define('productos', {
    nombreProducto: {type: DataTypes.STRING},
    precio: {type: DataTypes.STRING},
    imagen: {type: DataTypes.STRING},
    disponibilidad: {
                type: DataTypes.BOOLEAN,
                defaultValue: true 
            }
    
});

ProductoModel.belongsToMany(PedidoModel, {
    through: 'productos_pedidos',
    foreignKey: 'id_producto',
    as: 'pedidos',
    timestamps: false,
    onDelete: 'CASCADE'
});


export default ProductoModel

