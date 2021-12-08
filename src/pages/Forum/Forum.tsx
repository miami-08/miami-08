import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ActionTypes from 'store/forum/actionTypes';
import { TRootState } from 'store/types';
import { selectCurrentUser } from 'store/userProfile/selectors';

import { Title } from 'ui/components/Title';
import { BaseButton, Input } from 'ui/components';

import * as Styled from './styled';

export const Forum: FC = () => {
    const [inputValue, setInputValue] = useState({} as any);
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const forumData = useSelector((state: TRootState) => state.forum.forumData);

    console.log(forumData);
    const createTopic = useCallback(
        (title) => {
            dispatch({
                type: ActionTypes.CreateTopic,
                payload: { title },
            });
            setInputValue((state: any) => ({
                ...state,
                newTopic: '',
            }));
        },
        [dispatch],
    );

    const createMessage = useCallback(
        // eslint-disable-next-line max-params
        (TopicId, UserIdentifier, text, title): any => {
            dispatch({
                type: ActionTypes.CreateMessage,
                payload: { UserIdentifier, TopicId, text },
            });
            setInputValue((state: any) => ({
                ...state,
                [title]: '',
            }));
        },
        [dispatch],
    );

    const handleInputChange = (e) => {
        const { value } = e.target;
        const { name } = e.target;

        setInputValue((state: any) => ({
            ...state,
            [name]: value,
        }));
    };

    return (
        <Styled.Wrapper>
            <Title>Форум</Title>
            {forumData
                ? forumData.data.map((el: any) => (
                      <div key={el.id}>
                          <Styled.Category>{el.title}</Styled.Category>
                          <Styled.Messages>
                              {el.messages.map((message: any) => (
                                  <div key={message.id}>
                                      <Styled.Name>
                                          {`${message.secondName} ${message.firstName}`}
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
                                      placeholder="Сообщение"
                                  />
                                  <div>
                                      <BaseButton
                                          onClick={() =>
                                              createMessage(
                                                  el.id,
                                                  user.id,
                                                  inputValue[el.title],
                                                  el.title,
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
                        value={inputValue.newTopic}
                        name="newTopic"
                        placeholder="Новая тема"
                        onChange={handleInputChange}
                    />
                    <BaseButton
                        view="primaryFlat"
                        size="s"
                        onClick={() => createTopic(inputValue.newTopic)}
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
