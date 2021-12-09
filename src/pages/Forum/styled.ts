import styled from 'styled-components';

import { ITheme } from 'ui/themes';
import { colors } from 'ui/colors';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px 50px;
    flex-direction: column;
    height: 100%;
`;

export const Category = styled.h3<ITheme>`
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Messages = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Name = styled.div`
    color: ${colors.primary};
`;
export const Text = styled.div`
    margin-top: 5px;
`;

export const ColumnWrapper = styled.div`
    width: 42%;
    padding: 0 15px;
    height: 100%;
    overflow-y: auto;
`;

export const Topic = styled.div`
    font-size: 16px;
    padding: 5px 10px;
    lightgray 1px solid
    border-radius: 5px;
    background-color: aliceblue;
    margin-bottom: 5px;
`;
