import styled from 'styled-components';

import { ITheme } from 'ui/themes';
import { BackButton, BaseButton, Table } from 'ui/components';
import { colors } from 'ui/colors';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;

export const Category = styled.h3<ITheme>`
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Messages = styled(Table)`
    display: flex;
    flex-direction: column;
`;
export const Name = styled.div`
    color: ${colors.primary};
`;
export const Text = styled.div`
    margin-top: 5px;
`;

export const NewPostButton = styled(BaseButton)<ITheme>`
    color: ${({ theme }) => theme.colors.textInversion};
`;

export const ForumBackButton = styled(BackButton)<ITheme>`
    margin-top: 5px;
`;
