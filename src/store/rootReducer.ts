import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import userReducer from 'store/userProfile/slice';
import authReducer from 'store/auth/slice';
import gameReducer from 'store/game/slice';
import forumReducer from 'store/forum/slice';

import { IState } from './types';

export default (history: History) =>
    combineReducers<IState>({
        router: connectRouter(history),
        user: userReducer,
        auth: authReducer,
        forum: forumReducer,
        game: gameReducer,
    });

