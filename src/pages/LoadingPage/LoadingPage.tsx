import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RoutePath } from 'RoutePath';

import { setGameProps } from 'store/game/slice';

import { LVLs } from 'services/Game/lvls';

import * as Styled from './styled';

export const LoadingPage: FC = () => {
    const history = useHistory();

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setGameProps({
                lvlNum: 0,
                reachedKeys: {},
                initPoint: LVLs[0].entryPointA,
            }),
        );

        setTimer(setTimeout(() => history.push(RoutePath.Game), 2500));

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    return (
        <Styled.Wrapper>
            <Styled.LoadingModal>
                <Styled.LoadingTitle>Loading...</Styled.LoadingTitle>
            </Styled.LoadingModal>
        </Styled.Wrapper>
    );
};
