import { TRootState } from 'store';

export const gameStateSelector = (state: TRootState) => state?.game;
