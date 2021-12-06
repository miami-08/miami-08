import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import ActionTypes from 'store/forum/actionTypes';

import { Title } from 'ui/components/Title';
import { BaseButton } from 'ui/components';

import * as Styled from './styled';
import {TRootState} from "store/types";
import {selectCurrentUser} from "store/userProfile/selectors";

export const Forum: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const forumData = useSelector((state: TRootState) => state.forum)
    const createTopic = useCallback(() => {
        dispatch({
            type: ActionTypes.CreateTopic,
            payload: { title: inputValue },
        });
    }, [dispatch]);

    const createMessage = useCallback((id) => {
        dispatch({
            type: ActionTypes.CreateMessage,
            payload: { UserId: user.id, TopicId: id },
        });
    }, [dispatch]);
    return (
        <Styled.Wrapper>
            <Title>Форум</Title>
            {forumData.forumData.map((el) => (
                <>
                    <Styled.Category>{el.title}</Styled.Category>
                    <Styled.Messages>
                        {el.messages.map((message) => (
                            <div>
                                <Styled.Name>{message.name}</Styled.Name>
                                <Styled.Text>{message.text}</Styled.Text>
                            </div>
                        ))}
                    </Styled.Messages>
                    <input type="text" />
                    <BaseButton onClick={createMessage}>Новое сообщение</BaseButton>
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
