import db from "../database/db.js";
import { DataTypes } from "sequelize";

import PedidoModel from './PedidoModel.js';
import ProductoModel from './ProductoModel.js';

const ProductopedidoModel = db.define('productos_pedidos', {
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Definir relaciones
ProductopedidoModel.belongsTo(PedidoModel, { foreignKey: 'id_pedido' });
ProductopedidoModel.belongsTo(ProductoModel, { foreignKey: 'id_producto' });


export default ProductopedidoModel;