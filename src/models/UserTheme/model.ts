import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IUserTheme {
    theme: string;
}

export const userThemeModel: ModelAttributes<Model, IUserTheme> = {
    theme: {
        type: DataType.STRING,
        allowNull: false,
    },
};
