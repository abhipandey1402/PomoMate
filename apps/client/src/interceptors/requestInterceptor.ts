import { InternalAxiosRequestConfig } from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // const token = localStorage.getItem('authToken');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJpYXQiOjE3MzMwNzE0NDYsImV4cCI6MTczMzUwMzQ0Nn0.8qOXUSureJQ-GSv1VjHvPqCGFV0eNjaF69khFASNkOg"
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
};

export default requestInterceptor;
