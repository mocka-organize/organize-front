import { Outlet } from "react-router";
import Header from "../components/Header";

const SiteLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default SiteLayout;