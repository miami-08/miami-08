import axios from 'axios';

const axiosYandexInstance = axios.create({
    baseURL: 'https://ya-praktikum.tech/api/v2/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosApiInstance = axios.create({
    baseURL: `${process.env.REDIRECT_URI}/api/`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosYandexInstance;
