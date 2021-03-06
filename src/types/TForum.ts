import IDataStatus from 'types/IDataStatus';
import { IForum } from 'types/IForum';

import TNullable from './TNullable';

interface IForumProps extends IDataStatus {
    forumData: TNullable<IForum>;
    messages: TNullable<any[]>
}

type TForum = IForumProps;

export default TForum;
