/* eslint-disable react/prop-types */
import { Navigate, useNavigate } from "react-router";
import { API } from "../services";

const SafePath = ({ children }) => {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    API.defaults.headers.common['Content-Type'] = 'application/json';
    API.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        console.log(error);
        if (error.response.status === 401) {
            sessionStorage.clear();
            navigate("/login");
        }
        return Promise.reject(error);
    });

    API.interceptors.response.use(function (config) {
        return config;
    }, function (error) {
        if (error.response.status === 401) {
            sessionStorage.clear();
            navigate("/login");
        }
        return Promise.reject(error);
    });

    return token ? (children) : <Navigate to={'/'} />;
}

export default SafePath;