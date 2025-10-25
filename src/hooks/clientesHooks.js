import { useMutation, useQuery } from "@tanstack/react-query"
import { API, queryClient } from './../services/index';

export const useGetClientes = () => {
    return useQuery({
        queryKey: ["clientes"],
        queryFn: async () => {
            const request = await API.get("/clientes");
            return request.data;
        }
    })
}


export const useCreateClientes = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post(`/clientes/`, data, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["clientes"]
            })
        }
    })
}

export const useDeleteClientes = () => {
    return useMutation({
        mutationFn: async (id) => {
            const request = await API.delete(`/clientes/${id}`);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["clientes"]
            })
        }
    })
}
export const useReconhecerCliente = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post(`/clientes/reconhecimento`, data, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            return request.data;
        }
    })
}