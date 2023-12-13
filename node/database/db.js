import { Sequelize } from 'sequelize';


const db = new Sequelize('database_app', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: { freezeTableName: true },
    logging: console.log  // Habilitar logging
});

export default db


