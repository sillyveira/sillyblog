export const api = async (url: string, options: RequestInit = {}) => {
    return fetch(`http://10.0.0.200:8080${url}`, {
        ...options,
        credentials: 'include', // This ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
};