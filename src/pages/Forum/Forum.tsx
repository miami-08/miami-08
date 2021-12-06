import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ActionTypes from 'store/forum/actionTypes';

import { Title } from 'ui/components/Title';
import { BaseButton, Input } from 'ui/components';

import * as Styled from './styled';
import { TRootState } from 'store/types';
import { selectCurrentUser } from 'store/userProfile/selectors';

export const Forum: FC = () => {
    const [inputValue, setInputValue] = useState({} as any);
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const forumData = useSelector((state: TRootState) => state.forum.forumData);

    const createTopic = useCallback(() => {
        dispatch({
            type: ActionTypes.CreateTopic,
            payload: { title: 'hello' },
        });
    }, [dispatch]);

    const createMessage = useCallback(
        (TopicId, UserIdentifier, text) => {
            dispatch({
                type: ActionTypes.CreateMessage,
                payload: { UserIdentifier, TopicId, text },
            });
        },
        [dispatch],
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputValue((state) => ({
            ...state,
            [name]: value,
        }));
    };
    console.log(inputValue);
    return (
        <Styled.Wrapper>
            <Title>Форум</Title>
            {forumData
                ? forumData.data.map((el) => (
                      <div key={el.id}>
                          <Styled.Category>{el.title}</Styled.Category>
                          <Styled.Messages>
                              {el.messages.map((message) => (
                                  <div key={message.id}>
                                      <Styled.Name>
                                          {message.secondName +
                                              ' ' +
                                              message.firstName}
                                      </Styled.Name>
                                      <Styled.Text>{message.text}</Styled.Text>
                                  </div>
                              ))}
                          </Styled.Messages>

                          {user ? (
                              <>
                                  <Input
                                      type="text"
                                      name={el.title}
                                      value={inputValue[el.title]}
                                      onChange={handleInputChange}
                                      placeholder={'Сообщение'}
                                  />
                                  <div>
                                      <BaseButton
                                          onClick={() =>
                                              createMessage(
                                                  el.id,
                                                  user.id,
                                                  inputValue[el.title],
                                              )
                                          }
                                      >
                                          Отправить
                                      </BaseButton>
                                  </div>
                              </>
                          ) : null}
                      </div>
                  ))
                : 'Нет тем'}

            {user ? (
                <>
                    <h5>Новый пост</h5>
                    <input
                        value={inputValue['newTopic']}
                        name="newTopic"
                        placeholder={'Новая тема'}
                        onChange={handleInputChange}
                    />
                    <BaseButton
                        view="primaryFlat"
                        size="s"
                        onClick={createTopic}
                    >
                        Создать пост
                    </BaseButton>
                </>
            ) : null}

            <BaseButton view="primaryFlat" size="s">
                <Link to="/"> Домой </Link>
            </BaseButton>
        </Styled.Wrapper>
    );
};
