import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProovModel = db.define('proovedores', {
    nombreProov: {type: DataTypes.STRING},
    correoProov: {type: DataTypes.STRING, unique: true},
    telefonoProov: {type: DataTypes.STRING}                
});

export default ProovModel;