import { Message } from 'initSequelize';

export function createMsg(
    text: string,
    UserIdentifier: number,
    TopicId: number,
) {
    return Message.create({ text, UserIdentifier, TopicId });
}

export function getMsgsByTopicId(TopicId: number) {
    return Message.findAll({ where: { TopicId } });
}
