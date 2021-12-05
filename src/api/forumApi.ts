/* eslint-disable class-methods-use-this */
import TObjectLiteral from 'types/TObjectLiteral';
import { axiosApiInstance } from 'api/axios';

enum ForumUrls {
    GetTopics = 'get-topics',
    GetMessages = 'get-messages',
    CreateTopic = 'create-topic',
}

class ForumApi {
    getTopics() {
        axiosApiInstance.get(ForumUrls.GetTopics);
    }

    createTopic(data: TObjectLiteral) {
        axiosApiInstance.post(ForumUrls.CreateTopic, JSON.stringify(data));
    }

    getMessages(data: TObjectLiteral) {
        axiosApiInstance.post(ForumUrls.GetMessages, JSON.stringify(data));
    }
}

export const forumApi = new ForumApi();
