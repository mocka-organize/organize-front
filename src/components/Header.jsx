import { Button } from "antd";

const Header = () => {
    return (
        <div className="px-15 py-4 flex justify-between">
            <h1 className="text-2xl text-indigo-500 font-semibold">Organize</h1>
            <Button
                href={"/admin"}
                type="primary"
                shape="round"
                className="px-6! shadow-lg! shadow-indigo-500/50!"
            >
                Admin
            </Button>
        </div>
    );
}

export default Header;