import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikValues } from 'formik';
import { TUserInfo } from 'types/TUserInfo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RoutePath } from 'RoutePath';

import ActionTypes from 'store/userProfile/actionTypes';
import {
    selectCurrentUser,
    selectUserProfileInfo,
} from 'store/userProfile/selectors';

import { GoBackColumn } from 'components/GoBackColumn/GoBackColumn';
import { ChangeUserInfoTable } from 'components/ChangeUserInfoTable/ChangeUserInfoTable';

import * as Styled from './styled';

const ChangeUserInfoPage: FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const initValues = useSelector(selectUserProfileInfo);
    const user = useSelector(selectCurrentUser);

    const backToUserInfo = () => {
        history.push(RoutePath.UserInfo);
    };

    const submit = (values: FormikValues) => {
        dispatch({
            type: ActionTypes.ChangeInfo,
            payload: { ...user, ...values },
        });
    };
    return (
        <Styled.CustomWrapper>
            <GoBackColumn clickHandler={backToUserInfo} />
            {initValues && (
                <ChangeUserInfoTable
                    initValues={initValues ?? ({} as TUserInfo)}
                    submit={submit}
                />
            )}
        </Styled.CustomWrapper>
    );
};

export const ChangeUserInfoPageWithRouter = withRouter(ChangeUserInfoPage);
