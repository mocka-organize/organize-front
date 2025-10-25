import { Outlet } from "react-router";
import Menu from "../components/Menu";

const AdminLayout = () => {
    return (
        <div className="flex h-screen overflow-auto bg-indigo-50">
            <Menu />
            <div className="flex-1 py-4 px-5">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;