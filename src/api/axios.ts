import axios from 'axios';

const axiosYandexInstance = axios.create({
    baseURL: 'https://ya-praktikum.tech/api/v2/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosApiInstance = axios.create({
    baseURL: 'api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },

});

export default axiosYandexInstance;
