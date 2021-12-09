import { DataType } from 'sequelize-typescript';

export interface IUser {
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
    password: string;
    theme:string;
}

export const userModel = {
    firstName: {
        type: DataType.STRING,
        allowNull: false,
    },
    secondName: DataType.STRING,
    displayName: DataType.STRING,
    login: DataType.STRING,
    avatar: DataType.STRING,
    email: DataType.STRING,
    phone: DataType.STRING,
    password: DataType.STRING,
    theme: DataType.STRING,
};
