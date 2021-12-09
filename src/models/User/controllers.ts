import { User } from 'initSequelize';

// eslint-disable-next-line max-params
export async function createUser(
    firstName: string,
    secondName: string,
    login: string,
    email: string,
    phone: string,
    password: string,
    theme: string,
) {
    return User.create({
        firstName,
        secondName,
        login,
        email,
        phone,
        password,
        theme,
    });
}

export async function getAllUsers() {
    return User.findAll();
}
