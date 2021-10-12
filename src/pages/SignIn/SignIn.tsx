import React from 'react';
import * as Yup from 'yup';
import { signIn } from 'api/axios';
import { FormikValues } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

import { FormWithRouter } from 'uicomponents/Form';

const validationSchema = Yup.object().shape({
    login: Yup.string().required('Введите логин'),
    password: Yup.string().required('Введите пароль'),
});

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
    const handleSubmit = (
        values: FormikValues,
        history: RouteComponentProps['history'],
    ) => {
        signIn(values)
            .then(() => {
                history.push('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <FormWithRouter
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                title="Вход"
                fields={fields}
                initialValues={initialValues}
            />
        </div>
    );
};