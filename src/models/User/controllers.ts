import { User } from 'initSequelize';

import { IUser } from './model';

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

export async function getAllUsers() {
    return User.findAll();
}

export async function getUsersByFirstName(firstName: string) {
    return User.findAll({ where: { firstName } });
}
