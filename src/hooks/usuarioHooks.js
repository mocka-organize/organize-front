import { useMutation, useQuery } from "@tanstack/react-query"
import { API, queryClient } from "../services";

export const useGetUsuarios = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: async () => {
            const request = await API.get("/usuarios");
            return request.data;
        }
    })
}

export const useCreateUsuarios = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post(`/usuarios/`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["usuarios"]
            })
        }
    })
}

export const useUpdateUsuarios = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.put(`/usuarios/${data.usuario_id}`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["usuarios"]
            })
        }
    })
}

export const useDeleteUsuarios = () => {
    return useMutation({
        mutationFn: async (id) => {
            const request = await API.delete(`/usuarios/${id}`);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["usuarios"]
            })
        }
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const response = await API.post("/login", dados);
            return response.data;
        }
    });
}