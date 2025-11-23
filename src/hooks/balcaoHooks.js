import { useMutation, useQuery } from "@tanstack/react-query"
import { API, queryClient } from "../services";

export const useGetBalcoes = () => {
    return useQuery({
        queryKey: ["balcoes"],
        queryFn: async () => {
            const request = await API.get("/balcoes");
            return request.data;
        }
    })
}

export const useCreateBalcoes = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post(`/balcoes/`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["balcoes"]
            })
        }
    })
}

export const useUpdateBalcoes = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.put(`/balcoes/${data.balcao_id}`, data);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["balcoes"]
            })
        }
    })
}

export const useDeleteBalcoes = () => {
    return useMutation({
        mutationFn: async (id) => {
            const request = await API.delete(`/balcoes/${id}`);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["balcoes"]
            })
        }
    })
}
