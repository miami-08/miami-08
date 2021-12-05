import React, { FC, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router';
import { RoutePath } from 'RoutePath';

import { selectLogInFailed } from 'store/userProfile/selectors';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...props }) => {
    const history = useHistory();
    const { pathname } = history.location;

    const logInFailed = useSelector(selectLogInFailed);

    useEffect(() => {
        if (logInFailed) {
            history.push(RoutePath.SignIn);
        }
    }, [history, logInFailed, pathname]);

    return <Route {...props}>{children}</Route>;
};
