import { DataType } from 'sequelize-typescript';

export const messageModel = {
    text: {
        type: DataType.STRING,
        allowNull: false,
    },

    UserIdentifier: DataType.INTEGER,
    TopicId: DataType.INTEGER,
};
