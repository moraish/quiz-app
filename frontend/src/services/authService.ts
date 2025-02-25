// src/services/authService.ts
import axios, { AxiosError } from 'axios';

// const API_URL = 'http://your-backend-url/api';

// Define types for user and authentication responses
interface User {
    id: string;
    // name: string;
    email: string;
    institution?: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface AuthError {
    error: string;
}

// Create axios instance with base settings
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/auth/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const authService = {
    signup: async (userData: Omit<User, 'id'> & { password: string }): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post<AuthResponse>('/signup', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<AuthError>;
            throw axiosError.response ? axiosError.response.data : { error: 'Network error' };
        }
    },

    signin: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post<AuthResponse>('/signin', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<AuthError>;
            throw axiosError.response ? axiosError.response.data : { error: 'Network error' };
        }
    },

    logout: (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        return userStr ? (JSON.parse(userStr) as User) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },
};

export default authService;
