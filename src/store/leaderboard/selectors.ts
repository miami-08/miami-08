import { IState } from 'store/types';

export const leaderboardStateSelector = (state: IState) => state?.leaderboard;
