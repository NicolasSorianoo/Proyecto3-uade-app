import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ClienteModel = db.define('clientes', {
    nombreCliente: {type: DataTypes.STRING},
    apellidoCliente: {type: DataTypes.STRING},
    correoCliente: {type: DataTypes.STRING,
                    unique: true
                    },
    telefonoCliente: {type: DataTypes.STRING} 
    
});

export default ClienteModel