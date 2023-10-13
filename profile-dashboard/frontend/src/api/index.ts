import axios, {AxiosError, AxiosResponse} from 'axios';
import {NotifyError} from "@src/components/common/Notification";
import {authUrl, baseUrl} from "@src/common/auth/constantValue";


//request용 인터셉터
const tokenInterceptor = (config) => {
    const accessToken = window.localStorage.getItem('profileAccessToken');
    if (accessToken !== 'null') {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        config.headers['csrf'] = 'token';
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

// request 인터셉터 등록
api.interceptors.request.use(tokenInterceptor);
authApi.interceptors.request.use(tokenInterceptor);

//response 인터셉터
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 302) {
            console.log("401, 302 error relocation!")
            window.localStorage.removeItem("profileAccessToken");
            window.localStorage.removeItem("profileRefreshToken");
            //여기서 로컬캐시 삭제 해보기
            window.location.href = baseUrl
        } else if (error.response.status === 400) {
            NotifyError(error.response.data);
        } else if (error.response.status === 403) {
            NotifyError("권한 없음, 시스템 관리자에게 문의");
        }
        return Promise.reject(error);
    }
);
//response 인터셉터
authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 302) {
            console.log("***********401, 302 error relocation!**************")
            window.localStorage.removeItem("profileAccessToken");
            window.localStorage.removeItem("profileRefreshToken");

            window.location.href = baseUrl
        } else if (error.response.status === 400) {
            NotifyError(error.response.data);
        }

        return Promise.reject(error);
    }
);

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
        if (body === null) {
            response = await authApi.put(url);
        } else {
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

