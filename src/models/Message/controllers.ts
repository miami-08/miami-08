import { Message } from 'initSequelize';

export async function createMsg(text: string, UserId: number, TopicId: number) {
    return Message.create({ text, UserId, TopicId });
}

export async function getMsgsByTopicId(TopicId: number) {
    return Message.findAll({ where: { TopicId } });
}
