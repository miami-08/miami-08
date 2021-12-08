import React from 'react';
import styled from 'styled-components';

import { ITheme } from 'ui/themes';

import {
    IAllContentProps,
    IButtonProps,
    ISizeProps,
    IViewProps,
} from './types';
import { sizes } from './buttonViews';

export const StyledButton = styled.button<ITheme & IViewProps & ISizeProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background: ${({ theme, view = 'primary' }) =>
        theme.colors.buttons[view].backgroundColor};
    color: ${({ theme, view = 'primary' }) => theme.colors.buttons[view].color};
    transition: all 0.3s ease;
    padding: ${({ size = 's' }) => sizes[size].padding};
    font-size: ${({ size = 's' }) => sizes[size].fontSize};

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
        ${({ theme, view = 'primary' }) => theme.colors.buttons[view].hover};
    }

    & a {
        color: ${({ theme, view = 'primary' }) =>
            theme.colors.buttons[view].color};
        text-decoration: none;
        cursor: pointer;
    }
`;

export const BaseButton = React.forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    IButtonProps
>(({ ...props }, ref) => {
    const { children, disabled, ...rest } = props as IAllContentProps;

    return (
        <StyledButton
            ref={ref as React.MutableRefObject<HTMLButtonElement>}
            disabled={disabled}
            {...rest}
        >
            {children}
        </StyledButton>
    );
});
