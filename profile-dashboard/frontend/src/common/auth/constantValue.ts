export const authUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_AUTH_BASE_URL_PRODUCTION
        : process.env.REACT_APP_AUTH_BASE_URL_DEVELOPMENT;

export const profileRedirectUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_AUTH_REDIRECT_URL_PRODUCTION
        : process.env.REACT_APP_AUTH_REDIRECT_URL_DEVELOPMENT;

export const baseUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_AUTH_REDIRECT_URL_PRODUCTION
        : process.env.REACT_APP_AUTH_REDIRECT_URL_DEVELOPMENT;

export const clearLocalStorage = () => {
    window.localStorage.removeItem("profileAccessToken");
    window.localStorage.removeItem("profileRefreshToken");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userRole");
    window.localStorage.removeItem("expDate");
}