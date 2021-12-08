import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TObjectLiteral from 'types/TObjectLiteral';

import ActionTypes from 'store/game/actionTypes';
import { isServer } from 'store/rootStore';

import { Game } from 'services/Game';
import { GameConstants } from 'services/Game/contants';
import { LVLs } from 'services/Game/lvls';
import { IPoint, TLvlOuterCallback } from 'services/Game/types';

export interface IGameFieldProps {
    setScore: (score: number) => void;
    lvlNumber: number;
    reachedKeys: TObjectLiteral;
    initPoint: IPoint;
}

export const GameField: React.FC<IGameFieldProps> = ({
    setScore,
    lvlNumber,
    reachedKeys: reachedKeysObject,
    initPoint: newInitPoint,
}: IGameFieldProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch();

    const [height, setHeight] = useState(
        Math.floor(GameConstants.PERFECT_ONE * LVLs[lvlNumber].map.length),
    );

    const [width, setWidth] = useState(
        Math.floor(GameConstants.PERFECT_ONE * LVLs[lvlNumber].map[0].length),
    );

    useEffect(() => {
        const canvasElem = canvasRef.current;

        setHeight(
            Math.floor(GameConstants.PERFECT_ONE * LVLs[lvlNumber].map.length),
        );

        setWidth(
            Math.floor(
                GameConstants.PERFECT_ONE * LVLs[lvlNumber].map[0].length,
            ),
        );

        if (canvasElem && !isServer) {
            const lvlOuterCallback: TLvlOuterCallback = (
                lvlNum: number,
                reachedKeys: TObjectLiteral,
                initPoint: IPoint,
            ) => {
                dispatch({
                    type: ActionTypes.UpdateGameProps,
                    payload: {
                        lvlNum,
                        reachedKeys,
                        initPoint,
                    },
                });
            };

            const game = new Game({
                canvasRef: canvasElem,
                initBlock: newInitPoint,
                lvlOuterCallback,
                setScore,
                lvlNum: lvlNumber,
                reachedKeys: reachedKeysObject,
                gameHeight:
                    LVLs[lvlNumber].map.length * GameConstants.PERFECT_ONE,
                gameWidth:
                    LVLs[lvlNumber].map[0].length * GameConstants.PERFECT_ONE,
            });
            game.start();

            return () => {
                game.unsubscribeKeysCallback();
            };
        }

        return () => {};
    }, [lvlNumber]);

    return (
        <div
            style={{
                display: 'flex',
                height: 'calc(100% - 60px)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    height: `${Math.floor(
                        GameConstants.PERFECT_ONE * LVLs[lvlNumber].map.length,
                    )}px`,
                    width: `${Math.floor(
                        GameConstants.PERFECT_ONE
                            * LVLs[lvlNumber].map[0].length,
                    )}px`,
                    border: '1px solid #111E6C',
                }}
            >
                <canvas ref={canvasRef} height={height} width={width} />
            </div>
        </div>
    );
};
