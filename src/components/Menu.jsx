import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate()
    return (
        <div className="p-4 bg-white w-[250px]">
            <h1 onClick={() => navigate("/")} className="text-center text-2xl text-blue-500 font-semibold">Organize</h1>
            <nav className="mt-5 *:block *:leading-[40px] *:text-slate-500! *:hover:text-blue-500! *:rounded *:[&.active]:bg-blue-500! *:[&.active]:text-white! *:[&.active]:shadow-lg *:[&.active]:shadow-blue-500/40 *:pl-4">
                <NavLink end to={"/admin"}>Dashboard</NavLink>
                <NavLink end to={"/admin/usuarios"}>Usuários</NavLink>
                <NavLink end to={"/admin/departamentos"}>Departamentos</NavLink>
                <NavLink end to={"/admin/clientes"}>Clientes</NavLink>
                <NavLink end to={"/admin/balcoes"}>Balcões</NavLink>
            </nav>
        </div>
    );
}

export default Menu;