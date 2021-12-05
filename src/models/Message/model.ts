import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IMessage {
    text: string;
}

export const messageModel: ModelAttributes<Model, IMessage> = {
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
};
