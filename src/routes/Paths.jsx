
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Clientes from "../pages/admin/Clientes";
import SiteLayout from "../layouts/SiteLayout";
import Recognize from "../pages/Recognize";

const Paths = () => {
    return (
        <>
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiteLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/reconhecimento" element={<Recognize />} />
                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/admin/clientes" element={<Clientes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths;