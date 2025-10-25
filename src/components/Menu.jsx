import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate()
    return (
        <div className="p-4 bg-white w-[250px]">
            <h1 onClick={() => navigate("/")} className="text-center text-2xl text-indigo-500 font-semibold">Organize</h1>
            <nav className="mt-5 *:block *:leading-[40px] *:text-slate-500! *:hover:text-indigo-500! *:rounded *:[&.active]:bg-indigo-500! *:[&.active]:text-white! *:[&.active]:shadow-lg *:[&.active]:shadow-indigo-500/40 *:pl-4">
                <NavLink end to={"/admin"}>Dashboard</NavLink>
                <NavLink end to={"/admin/clientes"}>Clientes</NavLink>
            </nav>
        </div>
    );
}

export default Menu;