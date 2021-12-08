import { call, put, takeEvery } from 'redux-saga/effects';
import AuthApi from 'api/authApi';
import TObjectLiteral from 'types/TObjectLiteral';
import { RoutePath } from 'RoutePath';

import {
    logInFetching,
    logInFailed,
    logInLoaded,
    signupFetching,
    signUpLoaded,
    signUpFailed,
    logOutFetching,
    logOutLoaded,
    logOutFailed,
    setOAuthServiceId,
} from 'store/auth/slice';
import ActionTypes from 'store/auth/actionTypes';
import {
    dataFetching,
    setUserData,
    dataFailed,
    resetUserData,
} from 'store/userProfile/slice';

import history from 'utils/history';
import { mapApiUserToIUser } from 'utils/mapApiUserToUser';

function* logOutRequest() {
    yield put(logOutFetching());

    try {
        yield call(AuthApi.logOut);

        yield put(logOutLoaded());
        yield put(resetUserData());
    } catch (e: any) {
        const { reason = null } = e.response.data;

        yield put(logOutFailed(reason));
    } finally {
        yield call([history, history.push], RoutePath.SignIn);
    }
}

export function* logOutSaga() {
    yield takeEvery(ActionTypes.LogOut, logOutRequest);
}

function* currentUserRequest() {
    yield put(dataFetching());

    try {
        const response: TObjectLiteral = yield call(AuthApi.getCurrentUser);

        const theme: TObjectLiteral = yield call(
            AuthApi.getCurrentUserTheme,
            response.data.id,
        );

        yield put(
            setUserData(
                mapApiUserToIUser({
                    ...response.data,
                    theme: theme.data.theme,
                }),
            ),
        );
    } catch (e: any) {
        const { reason = null } = e.response.data;

        yield put(dataFailed(reason));
    }
}

export function* currentUserSaga() {
    yield takeEvery(ActionTypes.GetUser, currentUserRequest);
}

function* signUpRequest(action: any) {
    yield put(signupFetching());
    const { payload } = action;

    try {
        const response: TObjectLiteral = yield call(AuthApi.signUp, payload);
        yield put(signUpLoaded());

        yield call(currentUserRequest);
        yield call(AuthApi.addCurrentUserToDb, {
            ...payload,
            theme: 'light',
            identifier: response.data.id,
        });

        yield call([history, history.push], RoutePath.Home);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(signUpFailed(reason));
    }
}

export function* signUpSaga() {
    yield takeEvery(ActionTypes.SignUp, signUpRequest);
}

export function* signInRequest(action: any) {
    yield put(logInFetching());
    const { payload } = action;

    try {
        yield call(AuthApi.signIn, payload);

        yield put(logInLoaded());

        yield call(currentUserRequest);

        yield call([history, history.push], RoutePath.Home);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(logInFailed(reason));
    }
}

export function* signInSaga() {
    yield takeEvery(ActionTypes.SignIn, signInRequest);
}

function* oAuthSignInCodeRequest() {
    try {
        yield put(logInFetching());

        const serviceIdRes: TObjectLiteral = yield call(
            AuthApi.getOAuthServiceId,
        );

        const { service_id: serviceId } = serviceIdRes.data;

        yield put(setOAuthServiceId(serviceId));

        const getAppCodeLink = `${process.env.GET_APP_CODE}&client_id=${serviceId}&redirect_uri=${process.env.REDIRECT_URI}`;

        yield call([
            window,
            () => {
                window.location.href = getAppCodeLink;
            },
        ]);
    } catch (e: any) {
        const { reason = null } = e.response.data;

        yield put(logInFailed(reason));
    }
}

export function* oAuthSignInSaga() {
    yield takeEvery(ActionTypes.GetAuthSignInCode, oAuthSignInCodeRequest);
}

function* getToken(action: any) {
    try {
        yield call(AuthApi.getToken, action.payload);

        yield call(currentUserRequest);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(logInFailed(reason));
    }
}

export function* getTokenSaga() {
    yield takeEvery(ActionTypes.GetToken, getToken);
}
