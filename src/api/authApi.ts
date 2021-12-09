import TObjectLiteral from 'types/TObjectLiteral';
import axiosInstance, { axiosApiInstance } from 'api/axios';

enum AuthUrls {
    SignUp = 'add-user',
    SignIn = 'login',
    LogOut = 'auth/logout',
    GetUser = 'auth/user',
    GetOauthServiceId = 'oauth/yandex/service-id',
    UserTheme = 'user-theme/',
}

class AuthApi {
    signIn = (data: TObjectLiteral) => axiosApiInstance.post(AuthUrls.SignIn, JSON.stringify(data)).then((i) => i.data);

    logOut = () => axiosInstance.post(AuthUrls.LogOut);

    getCurrentUser = () => axiosInstance.get(AuthUrls.GetUser);

    getCurrentUserTheme = (userid: number) => axiosApiInstance.post(AuthUrls.UserTheme, { userid });

    signUp = (data: TObjectLiteral) => axiosApiInstance.post(AuthUrls.SignUp, JSON.stringify(data)).then((i) => i.data);

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
