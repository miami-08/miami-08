import { IApiUser, IUser } from 'types/IUser';

export function mapApiUserToIUser({
    id,
    first_name,
    second_name,
    display_name,
    login,
    avatar,
    email,
    phone,
    theme,
}: IApiUser): IUser {
    return {
        id,
        firstName: first_name,
        secondName: second_name,
        displayName: display_name,
        login,
        avatar,
        email,
        phone,
        theme,
    };
}
