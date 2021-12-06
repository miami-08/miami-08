import { Message } from 'initSequelize';

export async function createMsg(text: string, UserIdentifier: number, TopicId: number) {
    return Message.create({ text, UserIdentifier, TopicId });
}

export async function getMsgsByTopicId(TopicId: number) {
    return Message.findAll({ where: { TopicId } });
}
