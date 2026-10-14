import axios from "axios";
import { pageRoutes } from '../routes/pageRoutes';

const apiUrl = process.env.REACT_APP_API_URL + '/api';

const clearAccessToken = () => {
    localStorage.removeItem("access_token");
};

axios.defaults.baseURL = apiUrl;

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        config.headers["Accept"] = "application/x-www-form-urlencoded";

        config.headers['Access-Control-Allow-Headers'] = '*';
        config.headers['Access-Control-Allow-Headers'] = 'POST, GET, PUT, OPTIONS, DELETE';
        config.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type';
        config.headers['Accept'] = 'application/x-www-form-urlencoded';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            clearAccessToken();
            // window.location.href = `/611P/public/admin/${pageRoutes.LOGIN}`;
            return Promise.reject(error);
        }
        if (error.response && error.response.status === 403) {
            clearAccessToken();
            // window.location.href = pageRoutes.LOGIN;
            // window.location.href = `/611P/public/admin/${pageRoutes.LOGIN}`;
            return Promise.reject(error);

        }
        return Promise.reject(error);
    }
);

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

export const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
};