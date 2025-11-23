
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Clientes from "../pages/admin/Clientes";
import SiteLayout from "../layouts/SiteLayout";
import Recognize from "../pages/Recognize";
import SafePath from "./SafePath";
import Login from "../pages/auth/Login";
import Usuarios from "../pages/admin/Usuarios";
import Departamentos from "../pages/admin/Departamentos";
import Balcoes from "../pages/admin/Balcoes";

const Paths = () => {
    return (
        <>
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiteLayout />}>
                        <Route index element={<Home />} />
                        <Route path="reconhecimento" element={<Recognize />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<SafePath><AdminLayout /></SafePath>}>
                        <Route index element={<Dashboard />} />
                        <Route path="usuarios" element={<Usuarios />} />
                        <Route path="clientes" element={<Clientes />} />
                        <Route path="departamentos" element={<Departamentos />} />
                        <Route path="balcoes" element={<Balcoes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths;