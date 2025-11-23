import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate()
    const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
    const [menu, setMenu] = useState(false);
    function logout() {
        sessionStorage.clear();
        navigate("/login");
    }
    return (
        <div>
            <div className={`p-4 bg-white w-[250px] z-10 fixed top-0 ${menu ? "left-0" : "-left-[250px]"} h-screen flex flex-col justify-between duration-150 lg:relative lg:left-0`}>
                <div>
                    <h1 onClick={() => navigate("/")} className="text-center text-2xl text-blue-500 font-semibold">Organize</h1>
                    <nav className="mt-5 *:block *:leading-[40px] *:text-slate-500! *:hover:text-blue-500! *:rounded *:[&.active]:bg-blue-500! *:[&.active]:text-white! *:[&.active]:shadow-lg *:[&.active]:shadow-blue-500/40 *:pl-4">
                        <NavLink end onClick={() => setMenu(false)} to={"/admin"}>Dashboard</NavLink>
                        <NavLink end onClick={() => setMenu(false)} to={"/admin/usuarios"}>Usuários</NavLink>
                        <NavLink end onClick={() => setMenu(false)} to={"/admin/departamentos"}>Departamentos</NavLink>
                        <NavLink end onClick={() => setMenu(false)} to={"/admin/clientes"}>Clientes</NavLink>
                        <NavLink end onClick={() => setMenu(false)} to={"/admin/balcoes"}>Balcões</NavLink>
                        <NavLink end onClick={() => setMenu(false)} to={"/admin/consumos"}>Consumos</NavLink>
                    </nav>
                </div>
                {
                    usuario && (
                        <div className="flex gap-3 items-center">
                            <span className="w-[40px] leading-10 text-center bg-blue-500 rounded-full block text-white text-xl font-bold shadow-lg shadow-blue-500/40">{usuario.nome[0].toUpperCase()}</span>
                            <div>
                                <div className="leading-4 font-semibold text-slate-500">{usuario.nome}</div>
                                <div className="leading-4 text-xs text-blue-500 font-bold cursor-pointer" onClick={logout}>Sair</div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div
                onClick={() => setMenu(false)} 
                className={`w-full h-full bg-black/80 fixed top-0 left-0 z-1 invisible opacity-0 duration-200 ${ menu && "visible opacity-100"}`}
            ></div>
            <div
                onClick={() => setMenu(!menu)}
                className="w-15 h-15 rounded-full bg-blue-500 text-white flex justify-center items-center fixed bottom-6 right-6 text-3xl lg:hidden z-10"
            >
                <BiMenu />
            </div>
        </div>

    );
}

export default Menu;