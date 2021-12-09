import React, { useCallback } from 'react';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import ActionTypes from 'store/auth/actionTypes';

import { BaseButton } from 'ui/components';

import { UIForm } from 'uicomponents/Form';

import validationSchema from './validationSchema';

const initialValues = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
};

export const SignUpWithData = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const memoizedHandleSubmit = useCallback(
        (values: FormikValues) => {
            dispatch({ type: ActionTypes.SignUp, payload: values });
        },
        [dispatch],
    );

    const goToSignUp = () => {
        history.push('sign-in');
    };

    const goToHome = () => {
        history.push('/');
    };

    return (
        <UIForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            handleSubmit={memoizedHandleSubmit}
            title="Регистрация"
            fields={[
                { label: 'Имя', name: 'first_name' },
                { label: 'Фамилия', name: 'second_name' },
                { label: 'Логин', name: 'login' },
                { label: 'Email', name: 'email' },
                { label: 'Пароль', name: 'password', type: 'password' },
                { label: 'Телефон', name: 'phone' },
            ]}
        >
            <BaseButton onClick={goToSignUp}>
                 На страницу логина
            </BaseButton>
            <BaseButton onClick={goToHome}>
                 На главную страницу
            </BaseButton>
        </UIForm>

    );
};
