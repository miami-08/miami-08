/* eslint-disable class-methods-use-this */
import TObjectLiteral from 'types/TObjectLiteral';
import { axiosApiInstance } from 'api/axios';

enum ForumUrls {
    GetTopics = 'get-topics',
    CreateTopic = 'create-topic',
    CreateMessage = 'create-message',
    GetMessages = 'messages',
}

class ForumApi {
    getTopics = () => axiosApiInstance.get(ForumUrls.GetTopics).then((i) => i.data).then((i) => i.data);

    getMessagesByTopicId = (topicId: number) => axiosApiInstance.get(`${ForumUrls.GetMessages}/${topicId}`).then((i) => i.data);

    createTopic = (data: TObjectLiteral) => axiosApiInstance.post(ForumUrls.CreateTopic, JSON.stringify(data)).then((i) => i.data);

    createMessage = (data: TObjectLiteral) => axiosApiInstance.post(ForumUrls.CreateMessage, JSON.stringify(data)).then((i) => i.data);
}

export const forumApi = new ForumApi();
