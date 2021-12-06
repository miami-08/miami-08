import { all } from 'redux-saga/effects';

import {
    signInSaga,
    signUpSaga,
    logOutSaga,
    currentUserSaga,
    oAuthSignInSaga,
    getTokenSaga,
} from 'store/auth/sagas';
import { changeInfoSaga, changePasswordSaga } from 'store/userProfile/sagas';
import {
    createMessageSaga,
    createTopicsSaga,
    getTopicsSaga,
} from 'store/forum/sagas';

import { updateGameProps } from './game/sagas';

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
        updateGameProps(),
        getTopicsSaga(),
        createTopicsSaga(),
        createMessageSaga(),
    ]);
}
