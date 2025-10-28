import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
    baseURL: "https://api.otmzai.com.br"
})

export const queryClient = new QueryClient();