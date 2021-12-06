import { RouterState } from 'connected-react-router';

import { IState } from './types';
import { initialState as authInitialState } from './auth/slice';
import { initialState as userProfileInitialState } from './userProfile/slice';
import { initialState as leaderboardInitialState } from './leaderboard/slice';

export const getInitialState = (pathname: string = '/'): IState => ({
    auth: authInitialState,
    user: userProfileInitialState,
    leaderboard: leaderboardInitialState,
    router: {
        location: {
            pathname,
            search: '',
            hash: '',
            key: '',
        },
        action: 'POP',
    } as RouterState,
});
