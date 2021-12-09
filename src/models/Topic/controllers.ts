import { Topic } from 'initSequelize';

export function createTopic(title: string) {
    return Topic.create({ title });
}

export function getTopics() {
    return Topic.findAll({
        attributes: ['id', 'title'],
    });
}
