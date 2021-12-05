import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { FormikValues } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RoutePath } from 'RoutePath';

import ActionTypes from 'store/userProfile/actionTypes';

import { GoBackColumn } from 'components/GoBackColumn/GoBackColumn';
import { ChangeUserPasswordTable } from 'components/ChangeUserPasswordTable/ChangeUserPasswordTable';

import * as Styled from './styled';

const ChangePasswordPage: FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const backToUserInfo = () => {
        history.push(RoutePath.UserInfo);
    };

    const submit = (values: FormikValues) => {
        dispatch({ type: ActionTypes.ChangePassword, payload: values });
    };

    return (
        <Styled.CustomWrapper>
            <GoBackColumn clickHandler={backToUserInfo} />
            <ChangeUserPasswordTable submit={submit} />
        </Styled.CustomWrapper>
    );
};

export const ChangePasswordPageWithRouter = withRouter(ChangePasswordPage);
