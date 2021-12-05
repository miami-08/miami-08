import { User, dbConnect } from 'initSequelize';

import { IUser } from './User';

export async function createUser(firstName: string, lastName: string) {
    return User.create({ firstName, lastName });
}

export async function updateUserById(id: number, data: IUser) {
    return User.update(data, { where: { id } });
}

export async function deleteUserById(id: number) {
    return User.destroy({ where: { id } });
}

export async function getUserById(id: number) {
    return User.findOne({ where: { id } });
}

export async function getUsersByFirstName(firstName: string) {
    return User.findAll({ where: { firstName } });
}

export function dispatchOrmUserActions() {
    dbConnect().then(async () => {
        await createUser('Alex', 'Ivanov');

        const users = await getUsersByFirstName('Alex');
        if (!users.length) {
            throw new Error('Not found');
        }

        const { id } = users[0];
        await updateUserById(id, { firstName: 'Ivan', lastName: 'Ivanov' });

        const foundUser = await getUserById(id);
        console.log('found user: ', foundUser);
    });
}
