import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ClienteModel from "./ClienteModel.js";

const PedidoModel = db.define('pedidos', {
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false, 
    returning: true
});


PedidoModel.belongsTo(ClienteModel, { foreignKey: 'id_cliente', as: 'cliente', onDelete: 'CASCADE' });


export default PedidoModel

