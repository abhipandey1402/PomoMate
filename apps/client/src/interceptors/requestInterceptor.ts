import { InternalAxiosRequestConfig } from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // const token = localStorage.getItem('authToken');
    const token = ""
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
};

export default requestInterceptor;
