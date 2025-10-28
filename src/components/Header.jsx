import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className="px-15 py-4 flex justify-between">
            <h1 className="text-2xl text-indigo-500 font-semibold">Organize</h1>
            <div className="flex gap-4">
                <Button
                    onClick={() => location.pathname == "/" ? navigate("/reconhecimento") : navigate("/")}
                    type="primary"
                    shape="round"
                    className="px-6! shadow-lg! shadow-indigo-500/50!"
                >
                    { location.pathname == "/" ? "Desativar" : "Ativar" } reconhecimento
                </Button>
                <Button
                    href={"/admin"}
                    type="primary"
                    shape="round"
                    className="px-6! shadow-lg! shadow-indigo-500/50!"
                >
                    Admin
                </Button>
            </div>
        </div>
    );
}

export default Header;