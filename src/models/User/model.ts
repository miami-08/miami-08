import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IUser {
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
    identifier: number;
}

export const userModel: ModelAttributes<Model, IUser> = {
    identifier: {
        type: DataType.STRING,
        primaryKey: true,
    },
    firstName: {
        type: DataType.STRING,
        allowNull: false,
    },
    secondName: {
        type: DataType.STRING,
    },
    displayName: {
        type: DataType.STRING,
    },
    login: {
        type: DataType.STRING,
    },
    avatar: {
        type: DataType.STRING,
    },
    email: {
        type: DataType.STRING,
    },
    phone: {
        type: DataType.STRING,
    },
};
