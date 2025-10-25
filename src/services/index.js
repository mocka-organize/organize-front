import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
    baseURL: "https://organize-api-js.onrender.com"
})

export const queryClient = new QueryClient();