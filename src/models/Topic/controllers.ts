import { Topic } from 'initSequelize';

export async function createTopic(title: string) {
    return Topic.create({ title });
}

export async function getTopics() {
    return Topic.findAll({
        attributes: ['id', 'title'],
    });
}
