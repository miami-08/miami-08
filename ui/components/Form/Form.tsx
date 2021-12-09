import React from 'react';
import { Formik, Form } from 'formik';

import { BaseButton, Input, StyledError } from 'ui/components';

import { IUIFormProps } from 'uicomponents/Form/types';

import * as Styled from './styled';

export const UIForm: React.FC<IUIFormProps> = ({
    children,
    fields,
    title,
    initialValues,
    validationSchema,
    handleSubmit,
    errorText,
    buttonLabel = 'Присоединиться',
}) => (
    <Styled.DynamicFormBox>
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values, errors, touched, handleChange,
            }) => (
                <Form>
                    <Styled.Title>{title}</Styled.Title>
                    <Styled.FieldsWrapper>
                        {fields!.map((el) => (
                            <Input
                                key={el.name}
                                label={el.label}
                                name={el.name}
                                value={values[el.name]}
                                type={el.type || 'text'}
                                onChange={handleChange}
                                errorText={
                                    errors[el.name] && touched[el.name]
                                        ? errors[el.name]
                                        : null
                                }
                            />
                        ))}
                    </Styled.FieldsWrapper>
                    <BaseButton type="submit">{buttonLabel}</BaseButton>
                    <StyledError>{errorText}</StyledError>
                </Form>
            )}
        </Formik>
        {children}
    </Styled.DynamicFormBox>
);
