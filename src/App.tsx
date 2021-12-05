import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { RoutePath } from 'RoutePath';

import { selectUserPending } from 'store/userProfile/selectors';
import ActionUserTypes from 'store/auth/actionTypes';
// import ActionForumTypes from 'store/forum/actionTypes';

import { SignUpWithData } from 'pages/SignUp';
import { Leaderboard } from 'pages/Leaderboard';
import { LoadingPage } from 'pages/LoadingPage';
import { GamePage } from 'pages/GamePage';
import { Forum } from 'pages/Forum';
import { HomePage } from 'pages/HomePage';
import { SignInWithData } from 'pages/SignIn';
import { UserPageWithRouter } from 'pages/UserPage';
import useOAuth from 'pages/SignIn/useOAuth';
import { ChangePasswordPageWithRouter } from 'pages/ChangePasswordPage';
import { ChangeUserInfoPageWithRouter } from 'pages/ChangeUserInfoPage';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute';

import { GlobalStyles } from 'ui/global';
import { themes } from 'ui/themes';

const App: FC = () => {
    useOAuth();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ActionUserTypes.GetUser });
        // dispatch({ type: ActionForumTypes.GetTopics });
    }, [dispatch]);

    const isPending = useSelector(selectUserPending);

    return (
        <ThemeProvider theme={themes.light}>
            <GlobalStyles />
            <ErrorBoundary>
                <div className="app">
                    {isPending ? (
                        'pending'
                    ) : (
                        <Switch>
                            <Route exact path={RoutePath.Home}>
                                <HomePage />
                            </Route>
                            <Route path={RoutePath.Leaderboard}>
                                <Leaderboard />
                            </Route>
                            <Route path={RoutePath.SignUp}>
                                <SignUpWithData />
                            </Route>
                            <Route path={RoutePath.SignIn}>
                                <SignInWithData />
                            </Route>
                            <Route path={RoutePath.Game}>
                                <GamePage />
                            </Route>
                            <Route path={RoutePath.Loading}>
                                <LoadingPage />
                            </Route>
                            <Route path={RoutePath.Forum}>
                                <Forum />
                            </Route>
                            <ProtectedRoute exact path={RoutePath.UserInfo}>
                                <UserPageWithRouter />
                            </ProtectedRoute>
                            <ProtectedRoute path={RoutePath.ChangePasswordPage}>
                                <ChangePasswordPageWithRouter />
                            </ProtectedRoute>
                            <ProtectedRoute path={RoutePath.ChangeUserInfoPage}>
                                <ChangeUserInfoPageWithRouter />
                            </ProtectedRoute>
                            <Redirect to="/" />
                        </Switch>
                    )}
                </div>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default hot(App);
