import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from 'store/rootStore';
import { IState } from 'store/types';

import App from './App';

// eslint-disable-next-line no-underscore-dangle
export const { store, history } = configureStore(
    // eslint-disable-next-line no-underscore-dangle
    window.__INITIAL_STATE__,
);

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Window {
        __INITIAL_STATE__: IState;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

ReactDOM.hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
