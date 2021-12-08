import styled from 'styled-components';

import { Title } from 'ui/components/Title';
import { colors } from 'ui/colors';
import { BaseButton } from 'ui/components';

export const Wrapper = styled.div`
    height: 100%;
    background: radial-gradient(at bottom, white, ${colors.primary});
`;

export const Container = styled.div`
    padding-top: 220px;
    margin: 0 auto;
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MainTitle = styled(Title)`
    font-size: 46px;
    color: ${colors.white};
    margin-bottom: 100px;
`;

export const ThemeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Button = styled(BaseButton)`
    background-color: white;
    color: black;
    margin: 10px;

    &:hover {
        background-color: transparent;
        color: black;
    }

    &:disabled {
        background-color: transparent;
        color: ${colors.gray};
    }
`;

export const MenuButton = styled(BaseButton)`
    width: 200px;
    text-decoration: none;
    background-color: ${colors.primary};
    margin-bottom: 10px;

    & a {
        text-decoration: none;
        color: ${colors.white};
        font-size: 18px;
    }
`;
