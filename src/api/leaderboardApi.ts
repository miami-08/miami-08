import TObjectLiteral from 'types/TObjectLiteral';
import axiosInstance from 'api/axios';

const requestData = {
    ratingFieldName: 'miami7',
    cursor: 0,
    limit: 10,
};

export const teamLeaderboard = () => axiosInstance.post('leaderboard/all', JSON.stringify(requestData), {
    withCredentials: true,
});

export const addLeaderboard = (data: TObjectLiteral) => axiosInstance.post('/leaderboard', JSON.stringify(data), {
    withCredentials: true,
});
