import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

/** LAYOUT */
import Header from "./componentes/layout/Header"
import Navegacion from "./componentes/layout/Navegacion"
/**COMPONENTES */
import Proovedores from "./componentes/proovedores/Proovedores"
import NuevoProovedor from "./componentes/proovedores/NuevoProovedor"
/** CLIENTES */
import Clientes from "./componentes/clientes/Clientes"
import NuevoCliente from "./componentes/clientes/NuevoCliente"
import EditarCliente from "./componentes/clientes/EditarCliente"
/** PRODUCTOS */
import Productos from "./componentes/products/Productos"
import NuevoProducto from "./componentes/products/NuevoProducto"
import EditarProducto from "./componentes/products/EditarProducto"
/** PEDIDOS */
import Pedidos from "./componentes/pedidos/Pedidos"
import NuevoPedido from "./componentes/pedidos/NuevoPedido"

function App() {
  return (
    <Router>
        <Header/>
        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">

            <Routes>
              //Clientes
              <Route path="/clientes" element={<Clientes/>}/>
              <Route path="/clientes/nuevo" element={<NuevoCliente/>}/>
              <Route path="/clientes/editar/:id" element={<EditarCliente/>}/>
              //Proovedores
              <Route path="/proovedores" element={<Proovedores/>}/>
              <Route path="/proovedores/nuevo" element={<NuevoProovedor/>}/>
                
              
              //Productos
              <Route path="/productos" element={<Productos/>}/>
              <Route path="/productos/nuevo" element={<NuevoProducto/>}/>
              <Route path="/productos/editar/:id" element={<EditarProducto/>}/>
              //Pedidos
              <Route path="/pedidos" element={<Pedidos/>}/>
              <Route path="/pedidos/nuevo/:id" element = {<NuevoPedido/>}/>

            </Routes>
          </main>
        </div>
    </Router>
      
      
    
  )
}

export default App
