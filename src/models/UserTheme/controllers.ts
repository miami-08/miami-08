import { UserTheme } from 'initSequelize';

import { IUserTheme } from './model';

export async function createTheme(theme: string, UserIdentifier: string) {
    return UserTheme.create({ theme, UserIdentifier });
}

export async function updateUserThemeById(id: string, data: IUserTheme) {
    return UserTheme.update(data, { where: { id } });
}

export async function findTheme(UserIdentifier: string) {
    return UserTheme.findOne({ where: { UserIdentifier } });
}
