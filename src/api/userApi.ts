/* eslint-disable class-methods-use-this */
import TObjectLiteral from 'types/TObjectLiteral';
import axiosInstance, { axiosApiInstance } from 'api/axios';

enum UserUrls {
    ChangePassword = 'user/password',
    ChangeInfo = 'user/profile',
    GetUser = 'user/',
    ChangeTheme = 'change-theme/',
}

class UserApi {
    changePassword(data: TObjectLiteral) {
        axiosInstance.put(UserUrls.ChangePassword, JSON.stringify(data));
    }

    changeInfo(data: TObjectLiteral) {
        axiosInstance.put(UserUrls.ChangeInfo, JSON.stringify(data));
    }

    changeTheme = (data: string) =>
        axiosApiInstance.post(UserUrls.ChangeTheme, JSON.stringify(data));
}

export const userApi = new UserApi();
