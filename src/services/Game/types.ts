import TObjectLiteral from 'types/TObjectLiteral';

export interface ISides {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export interface IPoint {
    x: number;
    y: number;
}

// enum для типов порталов, которые перемещают игрока по уровням - вперед и назад
export enum LvlCreaser {
    Back = '-',
    Forward = '+',
}

/**
 * Тип метода перехода на уровень
 * @type
 * @param {number} lvlNum - номер нового уровня
 * @param {TObjectLiteral} reachedKeys - словарь со всеми нажатыми кнопками и их состоянием
 * @param {IPoint} newInitPoint - точка появления шарика
 */
export type TLvlOuterCallback = (
    lvlNum: number,
    reachedKeys: TObjectLiteral,
    newInitPoint: IPoint,
) => void;

export interface IGameProps {
    initBlock: IPoint;
    canvasRef: HTMLCanvasElement;
    lvlOuterCallback: TLvlOuterCallback;
    lvlNum: number;
    setScore: (score: number) => void;
    reachedKeys: TObjectLiteral;
    gameHeight: number;
    gameWidth: number;
}

export interface IGameSessionProps {
    lvlNum: number;
    reachedKeys: TObjectLiteral;
}
