import styled from 'styled-components';

import { colors } from 'ui/colors';
import { BaseButton } from 'ui/components';

export const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    font-size: 75px;
    font-weight: bold;
    flex-direction: column;
    background: ${colors.lightPrimary};
`;

export const GamePanel = styled.div`
    position: absolute;
    background: transparent;
    display: flex;
    padding: 5px 30px;
    top: 20px;
    left: 10px;
    gap: 15px;
    flex-direction: column;
`;

export const BackButton = styled(BaseButton)`
    background-color: ${colors.danger};

    & a {
        text-decoration: none;
        color: ${colors.white};
    }
`;

export const Timer = styled.div`
    font-size: 30px;
    color: ${colors.white};
    position: absolute;
    bottom: 50px;
    right: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid ${colors.white};

    border-radius: 25px;
    padding: 5px 15px;
    min-width: 85px;
`;
