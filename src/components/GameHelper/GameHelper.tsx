import React, { FC } from 'react';

import { BaseButton } from 'ui/components';

import * as Styled from './styled';

interface IGameHelperProps {
    onClose: () => void;
}

const hint = `
Управление с клавиатуры:
Управлять шариком можно с помощью стрелок - влево/враво и стрелка вверх для прыжка.
    
Типы блоков:
Белые блоки неосязаемые.
Синие блоки всегда осязаемые.
Блоки остальных цветов можно сделать осязамыми, если прыгнуть на напольные блоки 
соответсвующего цвета.
    
Управление с геймпада:
Поддержана возможность играть с джойстика, подключённого по USB/Bluetooth.
Управление движением влево/вправо - левый джойстик.
Прыжок - "A" для Xbox, "X" для PS.

`;

export const GameHelper: FC<IGameHelperProps> = ({ onClose }) => (
    <Styled.Container>
        <BaseButton onClick={onClose}> Закрыть </BaseButton>

        <div>
            <pre>{hint}</pre>
        </div>
    </Styled.Container>
);
