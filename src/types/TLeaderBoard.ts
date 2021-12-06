import IDataStatus from 'types/IDataStatus';

import { ILeadersProps } from 'pages/LeaderBoard/types';

import TNullable from './TNullable';

export interface ILeaderBoard extends IDataStatus {
    leaderboardInfo: TNullable<ILeadersProps>[];
}

type TLeaderBoard = ILeaderBoard;

export default TLeaderBoard;
