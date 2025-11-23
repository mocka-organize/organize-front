import { useMutation, useQuery } from "@tanstack/react-query"
import { API, queryClient } from "../services";

export const useGetDepartamentos = () => {
    return useQuery({
        queryKey: ["departamentos"],
        queryFn: async () => {
            const request = await API.get("/departamentos");
            return request.data;
        }
    })
}

export const useCreateDepartamentos = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post(`/departamentos/`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departamentos"]
            })
        }
    })
}

export const useUpdateDepartamentos = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.put(`/departamentos/${data.departamento_id}`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departamentos"]
            })
        }
    })
}

export const useDeleteDepartamentos = () => {
    return useMutation({
        mutationFn: async (id) => {
            const request = await API.delete(`/departamentos/${id}`);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departamentos"]
            })
        }
    })
}
