// filepath: d:\UnihubCapstone-feedback-frontend\my-app\src\api.js
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;