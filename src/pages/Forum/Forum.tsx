import React, {
    FC, useState, useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ActionTypes from 'store/forum/actionTypes';
import { selectCurrentUser } from 'store/userProfile/selectors';
import { selectForumMessages, selectTopics } from 'store/forum/selectors';

import { Title } from 'ui/components/Title';
import { BaseButton, Input } from 'ui/components';

import * as Styled from './styled';

export const Forum: FC = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [topicInput, setTopicInput] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [currentTopic, setCurrentTopic] = useState(null);

    const user = useSelector(selectCurrentUser);
    const topics = useSelector(selectTopics);
    const messages = useSelector(selectForumMessages);

    useEffect(() => {
        if (!user) {
            history.push('/sign-in');
        }
    }, [history, user]);

    const createTopic = () => {
        dispatch({
            type: ActionTypes.CreateTopic,
            payload: { title: topicInput },
        });
        setTopicInput('');
    };

    const createMessage = (): any => {
        dispatch({
            type: ActionTypes.CreateMessage,
            payload: {
                UserIdentifier: user?.id || 123,
                TopicId: currentTopic,
                text: messageInput,
            },
        });
        setMessageInput('');
    };

    const handleInputTopicChange = (e: any) => {
        const { value } = e.target;

        setTopicInput(value);
    };

    const handleMessageInputChange = (e: any) => {
        const { value } = e.target;

        setMessageInput(value);
    };

    useEffect(() => {
        dispatch({
            type: ActionTypes.GetTopics,
        });
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: ActionTypes.GetMessages,
            payload: currentTopic,
        });
    }, [currentTopic, dispatch]);

    return (
        <Styled.Wrapper>
            <Title>Форум </Title>

            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'space-around',
                    borderRadius: '10px',
                    padding: '15px 10px',
                    gap: '20px',
                }}
            >
                <Styled.ColumnWrapper>
                    <div> Темы форума </div>

                    {user ? (
                        <>
                            <input
                                value={topicInput}
                                name="newTopic"
                                placeholder="Новая тема"
                                onChange={handleInputTopicChange}
                            />
                            <BaseButton
                                view="primaryFlat"
                                size="s"
                                onClick={createTopic}
                                disabled={!topicInput}
                            >
                                Создать пост
                            </BaseButton>
                        </>
                    ) : null}
                    {topics?.map((topic: any) => (
                        // eslint-disable-next-line
                        <Styled.Topic
                            style={{ border: `1px solid ${topic.id === currentTopic ? 'blue' : 'transparent'}` }}
                            key={topic.id}
                            onClick={() => setCurrentTopic(topic.id)}
                        >
                            {topic.title}
                        </Styled.Topic>
                    ))}

                </Styled.ColumnWrapper>

                <Styled.ColumnWrapper>
                    <div> Сообщения в {} </div>
                    {user ? (
                        <>
                            <Input
                                type="text"
                                value={messageInput}
                                onChange={handleMessageInputChange}
                                placeholder="Сообщение"
                            />
                            <BaseButton
                                disabled={!messageInput}
                                onClick={createMessage}
                            >
                                    Отправить
                            </BaseButton>
                        </>
                    ) : null}
                    {!messages && <div>  Выберите тему </div>}
                    {currentTopic && messages?.map((message: any) =>

                    // eslint-disable-next-line
                        <Styled.Topic key={message.id}>
                            <b> {`${message?.sender?.firstName} ${message?.sender?.secondName}`}:  </b>
                            {message.text}
                        </Styled.Topic>)}

                </Styled.ColumnWrapper>
            </div>

            {/* {forumData
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

                      </div>
                  ))
                : 'Нет тем'} */}

            <BaseButton view="primaryFlat" size="s">
                <Link to="/"> Домой </Link>
            </BaseButton>
        </Styled.Wrapper>
    );
};
