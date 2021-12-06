import { call, put, takeEvery } from 'redux-saga/effects';
import { addLeaderboard, teamLeaderboard } from 'api/leaderboardApi';
import TObjectLiteral from 'types/TObjectLiteral';

import ActionTypes from 'store/leaderboard/actionTypes';

import { IDataProps } from 'pages/LeaderBoard/types';

import { dataFailed, dataFetching, setLeaderboard } from './slice';

function* getLeaderboardInfo() {
    yield put(dataFetching());

    try {
        const response: TObjectLiteral = yield call(
            teamLeaderboard,
        );

        const newData = response.data.map((data: IDataProps) => ({
            ...data.data,
        }));

        const arrayForSort = [...newData];
        const sorted = arrayForSort.sort((a, b) => b!.points - a!.points).slice(0, 5);

        yield put(setLeaderboard(sorted));
    } catch (e: any) {
        const { reason = null } = e.response.data;
        yield put(dataFailed(reason));
    }
}
export function* getLeaderboardSaga() {
    yield takeEvery(ActionTypes.GetLeaderboard, getLeaderboardInfo);
}

function* addTeamLeaderboard({ payload }: any) {
    yield put(dataFetching());

    try {
        yield call(
            addLeaderboard,
            payload,
        );
    } catch (e: any) {
        const { reason = null } = e.response.data;

        yield put(dataFailed(reason));
    }
}

export function* changeLeaderboardSaga() {
    yield takeEvery(ActionTypes.ChangeLeaderboard, addTeamLeaderboard);
}
