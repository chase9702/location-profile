import axios, { AxiosResponse, AxiosError } from 'axios';
import { store } from '@src/index';

import { NotifyError } from '@src/components/common/Notification';

// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response.status === 401) {
//             store.dispatch(AuthAction.clearAuth());
//         } else if (error.response.status === 400) {
//             NotifyError(error.response.data);
//         }
//
//         return Promise.reject(error);
//     }
// );

export const get = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.get(url);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const post = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.post(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const put = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.put(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const deleteData = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.delete(url);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};

export const patch = async <T>(url: string, body: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.patch(url, body);
        return response.data;
    } catch (e) {
        const error = e as AxiosError<T>;
        return Promise.reject(error.response.data);
    }
};
