import axios, {AxiosResponse, AxiosError} from 'axios';
import {store} from '@src/index';

const authUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_AUTH_BASE_URL_PRODUCTION
        : process.env.REACT_APP_AUTH_BASE_URL_DEVELOPMENT;

// 인터셉터 생성
const tokenInterceptor = (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        // 기타 헤더 설정 가능
    }
    return config;
};

// axios 인스턴스 생성
const api = axios.create({
    withCredentials: true, // 필요한 경우에만 설정
});

// 로그인용 api 인스턴스 생성
const authApi = axios.create({
    baseURL: authUrl,
    withCredentials: true, // 필요한 경우에만 설정
});

// 인터셉터 등록
api.interceptors.request.use(tokenInterceptor);
authApi.interceptors.request.use(tokenInterceptor);

export const get = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.get(url);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const post = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.post(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const put = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.put(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const deleteData = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.delete(url);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const patch = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.patch(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};


export const authGet = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await authApi.get(url);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const authPost = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await authApi.post(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const authPut = async <T>(url: string, body: any): Promise<T> => {
    try {
        let response: AxiosResponse<T>;
        if(body === null){
            response = await authApi.put(url);
        }else {
            response = await authApi.put(url, body);
        }
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const authDeleteData = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await authApi.delete(url);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const authPatch = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await authApi.patch(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

