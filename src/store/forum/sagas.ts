import { call, put, takeEvery } from 'redux-saga/effects';
import { forumApi } from 'api/forumApi';
import TObjectLiteral from 'types/TObjectLiteral';

import ActionTypes from 'store/forum/actionTypes';

import {
    dataFailed, dataFetching, setForumData, setTopicsMessages,
} from './slice';

function* requestGetTopics() {
    yield put(dataFetching());

    try {
        const response: TObjectLiteral = yield call(forumApi.getTopics);
        yield put(setForumData(response));
    } catch (e: any) {
        const reason = e?.response?.data?.reason;
        yield put(dataFailed(reason));
    }
}
export function* getTopicsSaga() {
    yield takeEvery(ActionTypes.GetTopics, requestGetTopics);
}

function* requestMessages({ payload }: any) {
    yield put(dataFetching());

    if (payload) {
        try {
            const response: TObjectLiteral = yield call(forumApi.getMessagesByTopicId, payload);
            yield put(setTopicsMessages(response));
        } catch (e: any) {
            const reason = e?.response?.data?.reason;
            yield put(dataFailed(reason));
        }
    }
}
export function* getMessages() {
    yield takeEvery(ActionTypes.GetMessages, requestMessages);
}

function* requestCreateTopic({ payload }: any) {
    try {
        const topics: TObjectLiteral = yield call(forumApi.createTopic, payload);
        yield put(setForumData(topics));
    } catch (e: any) {
        const reason = e?.response?.data?.reason;
        yield put(dataFailed(reason));
    }
}
export function* createTopicsSaga() {
    yield takeEvery(ActionTypes.CreateTopic, requestCreateTopic);
}

function* requestCreateMessage({ payload }: any) {
    try {
        yield call(forumApi.createMessage, payload);
        yield call(requestMessages, { payload: payload.TopicId });
    } catch (e: any) {
        const reason = e?.response?.data?.reason;
        yield put(dataFailed(reason));
    }
}
export function* createMessageSaga() {
    yield takeEvery(ActionTypes.CreateMessage, requestCreateMessage);
}
