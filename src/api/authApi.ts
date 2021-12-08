import TObjectLiteral from 'types/TObjectLiteral';
import axiosInstance, { axiosApiInstance } from 'api/axios';

enum AuthUrls {
    SignUp = 'auth/signup',
    SignIn = 'auth/signin',
    LogOut = 'auth/logout',
    GetUser = 'auth/user',
    GetOauthServiceId = 'oauth/yandex/service-id',
    UserTheme = 'user-theme/',
    AddUserToDb = 'add-user/',
}

class AuthApi {
    signUp = (data: TObjectLiteral) => axiosInstance.post(AuthUrls.SignUp, JSON.stringify(data));

    signIn = (data: TObjectLiteral) => axiosInstance.post(AuthUrls.SignIn, JSON.stringify(data));

    logOut = () => axiosInstance.post(AuthUrls.LogOut);

    getCurrentUser = () => axiosInstance.get(AuthUrls.GetUser);

    getCurrentUserTheme = (userid: number) => axiosApiInstance.post(AuthUrls.UserTheme, { userid });

    addCurrentUserToDb = (data: TObjectLiteral) => axiosApiInstance.post(AuthUrls.AddUserToDb, JSON.stringify(data));

    getOAuthServiceId = () => axiosInstance.get(AuthUrls.GetOauthServiceId, {
        params: {
            redirect_uri: process.env.REDIRECT_URI,
        },
    });

    getToken = (code: string) => axiosInstance.post('/oauth/yandex', {
        redirect_uri: process.env.REDIRECT_URI,
        code,
    });
}

const authApi = new AuthApi();

export default authApi;
