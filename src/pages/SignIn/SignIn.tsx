import React, { useCallback } from 'react';
import { FormikValues } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import ActionTypes from 'store/auth/actionTypes';
import { IState } from 'store/types';

import { BaseButton } from 'ui/components';

import { UIForm } from 'uicomponents/Form';

import validationSchema from './validationSchema';

const initialValues = {
    login: '',
    password: '',
};

const fields = [
    {
        label: 'Логин',
        name: 'login',
    },
    {
        label: 'Пароль',
        name: 'password',
        type: 'password',
    },
];

export const SignInWithData = () => {
    const errorText = useSelector((state: IState) => state.auth.error);

    const dispatch = useDispatch();

    const memoizedHandleSubmit = useCallback(
        (values: FormikValues) => {
            dispatch({ type: ActionTypes.SignIn, payload: values });
        },
        [dispatch],
    );

    const memoizedHandleOAuth = useCallback(() => {
        dispatch({ type: ActionTypes.GetAuthSignInCode });
    }, [dispatch]);

    return (
        <UIForm
            validationSchema={validationSchema}
            handleSubmit={memoizedHandleSubmit}
            title="Вход"
            fields={fields}
            initialValues={initialValues}
            errorText={errorText}
        >
            <BaseButton onClick={memoizedHandleOAuth}>
                Войти через Yandex
            </BaseButton>
        </UIForm>
    );
};
