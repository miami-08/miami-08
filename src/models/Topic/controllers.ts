import { Topic } from 'initSequelize';

export function createTopic(title: string, topicid: number) {
    return Topic.create({ title, topicid });
}

export function getTopics() {
    return Topic.findAll({
        attributes: ['id', 'title'],
    });
}
