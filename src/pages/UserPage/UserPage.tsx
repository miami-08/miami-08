import React, { FC, useCallback } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from 'types/IUser';
import { RoutePath } from 'RoutePath';

import ActionTypes from 'store/auth/actionTypes';
import { selectUserProfileInfo } from 'store/userProfile/selectors';

import { GoBackColumn } from 'components/GoBackColumn/GoBackColumn';
import { UserInfoTable } from 'components/UserInfoTable/UserInfoTable';

import * as Styled from './styled';

const UserPage: FC<RouteComponentProps> = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const user = useSelector(selectUserProfileInfo);

    const goBackHome = () => history.push(RoutePath.Home);

    const logOut = useCallback(() => {
        dispatch({ type: ActionTypes.LogOut, payload: history });
    }, [dispatch, history]);

    return (
        <Styled.CustomWrapper>
            <GoBackColumn clickHandler={goBackHome} />
            <UserInfoTable
                user={user ?? ({} as IUser)}
                changeInfoLink="/user/change-info"
                changePasswordLink="/user/change-password"
                quitHandler={logOut}
            >
                Hello
            </UserInfoTable>
        </Styled.CustomWrapper>
    );
};

export const UserPageWithRouter = withRouter(UserPage);
