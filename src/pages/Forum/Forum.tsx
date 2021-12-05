import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ActionTypes from 'store/forum/actionTypes';

import { fakeElements } from 'components/Forum/fakeData';
import { TableBody } from 'components/Forum/TableBody';
import { TableHead } from 'components/Forum/TableHead';

import { Title } from 'ui/components/Title';
import { BaseButton } from 'ui/components';

import * as Styled from './styled';

export const Forum: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const createTopic = useCallback(() => {
        dispatch({
            type: ActionTypes.CreateTopic,
            payload: { title: inputValue },
        });
    }, [dispatch]);
    return (
        <Styled.Wrapper>
            <Title>Форум</Title>

            {fakeElements.map((el) => (
                <>
                    <Styled.Category>{el.title}</Styled.Category>
                    <Styled.TableForum>
                        <TableHead />
                        <TableBody elements={el.data} />
                    </Styled.TableForum>
                </>
            ))}
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <BaseButton view="primaryFlat" size="s" onClick={createTopic}>
                Новый пост
            </BaseButton>

            <BaseButton view="primaryFlat" size="s">
                <Link to="/"> Домой </Link>
            </BaseButton>
        </Styled.Wrapper>
    );
};
