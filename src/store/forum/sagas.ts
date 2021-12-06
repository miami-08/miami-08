import { call, put, takeEvery } from 'redux-saga/effects';
import { forumApi } from 'api/forumApi';
import TObjectLiteral from 'types/TObjectLiteral';

import ActionTypes from 'store/forum/actionTypes';

import { dataFailed, dataFetching, setForumData } from './slice';
import AuthApi from 'api/authApi';

function* requestGetForumData() {
    yield put(dataFetching());

    try {
        const response: TObjectLiteral = yield call(forumApi.getTopics);
        console.log('hi', response);
        yield put(setForumData(response));
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* getTopicsSaga() {
    yield takeEvery(ActionTypes.GetTopics, requestGetForumData);
}

function* requestCreateTopic({ payload }: any) {
    yield put(dataFetching());

    try {
        const response: TObjectLiteral = yield call(forumApi.getTopics);
        console.log('hi', response);
        yield call(forumApi.createTopic, payload);

        yield put(setForumData({ ...response, ...payload }));
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* createTopicsSaga() {
    yield takeEvery(ActionTypes.CreateTopic, requestCreateTopic);
}

function* requestCreateMessage({ payload }: any) {
    yield put(dataFetching());

    try {
        yield call(forumApi.createMessage, payload);
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* createMessageSaga() {
    yield takeEvery(ActionTypes.CreateMessage, requestCreateMessage);
}
