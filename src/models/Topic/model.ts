import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface ITopic {
    title: string;
}

export const topicModel: ModelAttributes<Model, ITopic> = {
    title: {
        type: DataType.STRING,
        allowNull: false,
    },
};
