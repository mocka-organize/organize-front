import { Statistic } from "antd";
import { useGetDados } from "../../hooks/utilsHooks";

const Dashboard = () => {

    const { data: dados, isFetched } = useGetDados();

    return (
        <>
            <h1 className="text-2xl text-blue-500 font-semibold">Dashboard</h1>
            <div className="grid lg:grid-cols-5 gap-4 mt-4 *:bg-white *:p-4! *:rounded-md *:shadow-lg">
                <Statistic
                    className="font-bold"
                    title={<span className="uppercase text-xs text-slate-500 font-semibold">Clientes</span>}
                    value={isFetched ? dados.clientes : 0}
                />
                <Statistic
                    className="font-bold"
                    title={<span className="uppercase text-xs text-slate-500 font-semibold">Balcões</span>}
                    value={isFetched ? dados.balcoes : 0}
                />
            </div>
        </>
    );
}

export default Dashboard;