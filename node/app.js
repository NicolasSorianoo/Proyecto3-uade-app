import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import PedidoModel from './models/PedidoModel.js';
import ProductoModel from './models/ProductoModel.js';
import routes from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configuración de relaciones
PedidoModel.belongsToMany(ProductoModel, { through: 'productos_pedidos', foreignKey: 'id_pedido', as: 'productos', onDelete: 'CASCADE' });

try {
    await db.authenticate();
    await db.sync({ force: false });
    console.log('Conexion exitosa');
} catch (error) {
    console.log(`El error es ${error}`);
}

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use('/', routes);
app.use(express.static('uploads'))

app.listen(port, () => {
    console.log('Server UP running in http://localhost:8000/');
});