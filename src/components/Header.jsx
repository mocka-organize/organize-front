import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className="px-15 py-4 flex justify-between">
            <Link to={"/"}>
                <h1 className="text-2xl text-blue-500 font-semibold">Organize</h1>
            </Link>
            <div className="flex gap-4">
                {/* <Button
                    onClick={() => location.pathname == "/" ? navigate("/reconhecimento") : navigate("/")}
                    type="primary"
                    shape="round"
                    className="px-6! shadow-lg! shadow-indigo-500/50!"
                >
                    { location.pathname == "/" ? "Ativar" : "Desativar" } reconhecimento
                </Button> */}
                <Button
                    href={"/login"}
                    type="primary"
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

export default Header;