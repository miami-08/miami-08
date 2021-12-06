import React, { FC } from 'react';

import * as Styled from './styled';
import { ITableBodyProps } from './types';

export const TableBody: FC<ITableBodyProps> = ({ elements }) => (
    <tbody>
        {elements.length ? elements.map((el, index) => (
            <Styled.BodyTr key={el!.miami7}>
                <Styled.BodyTd>{index + 1}</Styled.BodyTd>
                <Styled.BodyTd>{el!.name}</Styled.BodyTd>
                <Styled.BodyTd>{el!.points}</Styled.BodyTd>
            </Styled.BodyTr>
        )) : null}
    </tbody>
);
