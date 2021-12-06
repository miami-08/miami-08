/* eslint-disable class-methods-use-this */
import TObjectLiteral from 'types/TObjectLiteral';
import { axiosApiInstance } from 'api/axios';

enum ForumUrls {
    GetTopics = 'get-topics',
    CreateTopic = 'create-topic',
    CreateMessage = 'create-message',
}

class ForumApi {
    getTopics = () => axiosApiInstance.get(ForumUrls.GetTopics);

    createTopic(data: TObjectLiteral) {
        axiosApiInstance.post(ForumUrls.CreateTopic, JSON.stringify(data));
    }

    createMessage(data: TObjectLiteral) {
        axiosApiInstance.post(ForumUrls.CreateMessage, JSON.stringify(data));
    }
}

export const forumApi = new ForumApi();
