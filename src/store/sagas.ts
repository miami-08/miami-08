import { all } from 'redux-saga/effects';

import {
    signInSaga,
    signUpSaga,
    logOutSaga,
    currentUserSaga,
    oAuthSignInSaga,
    getTokenSaga,
} from 'store/auth/sagas';
import {
    changeInfoSaga,
    changePasswordSaga,
    changeThemeSaga,
} from 'store/userProfile/sagas';
import {
    changeLeaderboardSaga,
    getLeaderboardSaga,
} from 'store/leaderboard/sagas';

import { updateGameProps } from './game/sagas';
import {
    createMessageSaga,
    createTopicsSaga,
    getTopicsSaga,
} from 'store/forum/sagas';

export default function* rootSaga() {
    yield all([
        signInSaga(),
        signUpSaga(),
        logOutSaga(),
        changeInfoSaga(),
        changePasswordSaga(),
        currentUserSaga(),
        oAuthSignInSaga(),
        getTokenSaga(),
        changeLeaderboardSaga(),
        getLeaderboardSaga(),
        updateGameProps(),
        changeThemeSaga(),
        createMessageSaga(),
        createTopicsSaga(),
        getTopicsSaga(),
    ]);
}
