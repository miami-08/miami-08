import { User } from 'initSequelize';

export async function createUser(
    firstName: string,
    secondName: string,
    login: string,
    email: string,
    phone: string,
    identifier: number,
) {
    return User.create({
        firstName,
        secondName,
        login,
        email,
        phone,
        identifier,
    });
}

export async function getAllUsers() {
    return User.findAll({
        attributes: ['firstName', 'secondName', 'identifier'],
    });
}
