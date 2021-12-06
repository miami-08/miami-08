import { TUserInfo } from 'types/TUserInfo';

import { TRootState } from 'store/types';

const userStateSelector = (state: TRootState) => state.user;

export const selectCurrentUser = (state: TRootState) =>
    userStateSelector(state).userInfo;

export const selectUserProfileInfo = (state: TRootState): TUserInfo | null => {
    const user = selectCurrentUser(state);

    if (user !== null && typeof user !== 'undefined') {
        const { avatar, id, login, ...rest } = user;

        return rest;
    }

    return null;
};

export const selectUserPending = (state: TRootState) =>
    userStateSelector(state)?.pending;

export const selectIsLoggedIn = (state: TRootState) =>
    userStateSelector(state)?.userInfo;

export const selectLogInFailed = (state: TRootState) =>
    userStateSelector(state)?.error;
