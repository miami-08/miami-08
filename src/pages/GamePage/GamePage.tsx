import React, { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'RoutePath';

import { selectCurrentUser } from 'store/userProfile/selectors';
import { isServer } from 'store/rootStore';
import ActionTypes from 'store/leaderboard/actionTypes';
import { leaderboardStateSelector } from 'store/leaderboard/selectors';
import { gameStateSelector } from 'store/game/selectors';

import { ILeadersProps } from 'pages/LeaderBoard/types';

import { GameField } from 'components/GameField/GameField';

import { backgroundMusic } from 'services/BackgroundMusic/BackgroundMusic';

import { BackButton, BaseButton } from 'ui/components';

import * as Styled from './styled';

export const GamePage: FC = () => {
    const [score, setScore] = useState(0);

    const gameProps = useSelector(gameStateSelector);

    const user = useSelector(selectCurrentUser);
    const leaderboard = useSelector(leaderboardStateSelector);

    const dispatch = useDispatch();

    const history = useHistory();

    if (isServer) {
        history.push(RoutePath.Home);
    }

    useEffect(() => {
        backgroundMusic.play();

        return () => backgroundMusic.stop();
    }, []);

    useEffect(() => {
        const newData = {
            miami7: Date.now(),
            name: user ? user.login : null,
            points: score,
        };
        const requestData = {
            data: newData,
            ratingFieldName: 'miami7',
            teamName: 'miami7',
        };
        const leaderInit = {} as ILeadersProps;
        const currentUser = Array.isArray(leaderboard.leaderboardInfo)
            ? leaderboard.leaderboardInfo.filter(
                (el) => user!.login === el!.name,
            )
            : [leaderInit];

        if (score > currentUser[0]!.points) {
            dispatch({
                type: ActionTypes.ChangeLeaderboard,
                payload: requestData,
            });
        }
    }, [score, dispatch]);

    return (
        <Styled.Wrapper>
            <GameField
                reachedKeys={gameProps.reachedKeys}
                setScore={setScore}
                lvlNumber={gameProps.lvlNum}
                initPoint={gameProps.initPoint}
            />
            <Styled.GamePanel>
                <BackButton size="s">
                    <Link to="/">На главную страницу</Link>
                </BackButton>
                <BaseButton onClick={() => backgroundMusic.toggleMusic()}>
                    Toggle music
                </BaseButton>
                <Styled.Timer>{score} points</Styled.Timer>
            </Styled.GamePanel>
        </Styled.Wrapper>
    );
};
