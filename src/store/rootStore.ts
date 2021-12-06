import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { TAppStore, IState } from './types';
import createRootReducer from './rootReducer';
import rootSaga from './sagas';

export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

function getComposeEnhancers() {
    if (process.env.NODE_ENV !== 'production' && !isServer) {
        return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    return compose;
}

export function configureStore(initialState: IState, url = '/') {
    const history = isServer
        ? createMemoryHistory({ initialEntries: [url] })
        : createBrowserHistory();

    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = getComposeEnhancers();
    const middlewares = [routerMiddleware(history), sagaMiddleware];

    const store = createStore(
        createRootReducer(history),
        // ошибка типизации - 'State' is not assignable to parameter of type 'DeepPartial<State>'
        // @ts-ignore
        initialState,
        composeEnhancers(applyMiddleware(...middlewares)),
    ) as TAppStore;

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    if (!isServer) {
        sagaMiddleware.run(rootSaga);
    }

    return { store, history };
}
