import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { leaderboardStateSelector } from 'store/leaderboard/selectors';

import { TableHead } from 'components/Leaderboard/TableHead/TableHead';
import { TableBody } from 'components/Leaderboard/TableBody/TableBody';

import { Title } from 'ui/components/Title';
import { BaseButton } from 'ui/components';

import { Wrapper } from 'uicomponents/Wrapper/styled';

import * as Styled from './styled';

export const Leaderboard: FC = () => {
    const leaderboard = useSelector(leaderboardStateSelector);

    return (
        <Wrapper>
            <Title>LeaderBoard</Title>
            <Styled.LeaderTable>
                <TableHead />
                {leaderboard?.leaderboardInfo?.length ? <TableBody elements={leaderboard?.leaderboardInfo} /> : null}
            </Styled.LeaderTable>
            <BaseButton size="s" view="primaryFlat">
                <Link to="/">Домой</Link>
            </BaseButton>
        </Wrapper>
    );
};
