import { userApi } from 'api/userApi';
import { call, put, takeEvery } from 'redux-saga/effects';
import { RoutePath } from 'RoutePath';

import ActionTypes from 'store/userProfile/actionTypes';

import history from 'utils/history';

import { dataFailed, dataFetching, setUserData } from './slice';

function* requestChangeInfo({ payload }: any) {
    yield put(dataFetching());

    try {
        const response: { [key: string]: number | string } = yield call(
            userApi.changeInfo,
            payload,
        );

        yield put(setUserData({ ...payload, ...response }));
        yield call([history, history.push], RoutePath.Home);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* changeInfoSaga() {
    yield takeEvery(ActionTypes.ChangeInfo, requestChangeInfo);
}

function* requestChangePassword({ payload }: any) {
    yield put(dataFetching());

    try {
        const response: { [key: string]: number | string } = yield call(
            userApi.changePassword,
            payload,
        );

        yield put(setUserData(response));
        yield call([history, history.push], RoutePath.Home);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* changePasswordSaga() {
    yield takeEvery(ActionTypes.ChangePassword, requestChangePassword);
}

function* requestChangeTheme({ payload }: any) {
    try {
        yield call(userApi.changeTheme, payload);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* changeThemeSaga() {
    yield takeEvery(ActionTypes.ChangeTheme, requestChangeTheme);
}
