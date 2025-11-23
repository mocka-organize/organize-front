import { useQuery } from "@tanstack/react-query"
import { API } from './../services/index';

export const useGetDados = () => {
    return useQuery({
        queryKey: ["dados"],
        queryFn: async () => {
            const request = await API.get("/dados");
            return request.data;
        }
    })
}