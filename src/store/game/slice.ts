/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TObjectLiteral from 'types/TObjectLiteral';

import { IPoint } from 'services/Game/types';
import { LVLs } from 'services/Game/lvls';

export type TGameState = {
    lvlNum: number;
    reachedKeys: TObjectLiteral;
    initPoint: IPoint;
};

export const initialState: TGameState = {
    lvlNum: 0,
    reachedKeys: {},
    initPoint: LVLs[0].entryPointA,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameProps(state, { payload }: { payload: TGameState }) {
            state.lvlNum = payload.lvlNum;
            state.reachedKeys = payload.reachedKeys;
            state.initPoint = payload.initPoint;
        },

        clearGameProps(state) {
            state.lvlNum = initialState.lvlNum;
            state.reachedKeys = initialState.reachedKeys;
            state.initPoint = initialState.initPoint;
        },
    },
});

export const { setGameProps, clearGameProps } = gameSlice.actions;

export default gameSlice.reducer;
