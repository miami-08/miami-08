import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TUserInfo } from 'types/TUserInfo';

import { BaseButton } from 'ui/components';

import { userLabels } from './labels';
import * as Styled from './styled';

interface IUserInfoTableProps {
    user: TUserInfo | null;
    changeInfoLink: string;
    changePasswordLink: string;
    quitHandler: () => void;
}

export const UserInfoTable: FC<IUserInfoTableProps> = ({
    user,
    changeInfoLink,
    changePasswordLink,
    quitHandler,
}) => {
    const userEntries =
        user &&
        Object.entries(user).map(([key, value]) => [
            // обращаемся к свойству с помощью литерала
            // @ts-ignore
            userLabels[key],
            value,
        ]);

    return (
        <Styled.Container>
            <Styled.TableWrapper>
                <tbody>
                    {userEntries &&
                        userEntries.map(([key, value]) => (
                            <Styled.TableRow key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </Styled.TableRow>
                        ))}
                </tbody>
            </Styled.TableWrapper>

            <BaseButton view="primaryFlat">
                <Link to={changeInfoLink}>Изменить данные</Link>
            </BaseButton>
            <BaseButton view="primaryFlat">
                <Link to={changePasswordLink}>Изменить пароль</Link>
            </BaseButton>
            <BaseButton view="dangerFlat" onClick={quitHandler}>
                Выйти
            </BaseButton>
        </Styled.Container>
    );
};
