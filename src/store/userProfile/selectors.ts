import { TUserInfo } from 'types/TUserInfo';

import { IState } from 'store/types';

const userStateSelector = (state: IState) => state.user;

export const selectCurrentUser = (state: IState) => userStateSelector(state).userInfo;

export const selectUserProfileInfo = (state: IState): TUserInfo | null => {
    const user = selectCurrentUser(state);

    if (user !== null && typeof user !== 'undefined') {
        const {
            avatar, id, login, ...rest
        } = user;

        return rest;
    }

    return null;
};

export const selectUserPending = (state: IState) => userStateSelector(state)?.pending;

export const selectIsLoggedIn = (state: IState) => userStateSelector(state)?.userInfo;

export const selectLogInFailed = (state: IState) => userStateSelector(state)?.error;
