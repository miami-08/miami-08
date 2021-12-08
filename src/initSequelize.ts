import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { userThemeModel } from 'models/UserTheme/model';
import { userModel } from 'models/User/model';
import { messageModel } from 'models/Message/model';
import { topicModel } from 'models/Topic/model';

const sequelizeOptions: SequelizeOptions = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

export const Topic = sequelize.define('Topic', topicModel, {});

export const Message = sequelize.define('Message', messageModel, {});

export const User = sequelize.define('User', userModel, {});
export const UserTheme = sequelize.define('UserTheme', userThemeModel, {});
UserTheme.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(User);

Topic.hasMany(Message);
Message.belongsTo(Topic);

export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
