import { useMutation, useQuery } from "@tanstack/react-query"
import { API, queryClient } from "../services";

export const useGetConsumos = () => {
    return useQuery({
        queryKey: ["consumos"],
        queryFn: async () => {
            const request = await API.get("/consumos");
            return request.data;
        }
    })
}

export const useCreateConsumos = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post(`/consumos/`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["consumos"]
            })
        }
    })
}

export const useUpdateConsumos = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.put(`/consumos/${data.consumo_id}`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["consumos"]
            })
        }
    })
}

export const useDeleteConsumos = () => {
    return useMutation({
        mutationFn: async (id) => {
            const request = await API.delete(`/consumos/${id}`);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["consumos"]
            })
        }
    })
}
