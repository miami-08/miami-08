import { TRootState } from 'store/types';

const forumStateSelector = (state: TRootState) => state?.forum;

export const selectForumMessages = (state: TRootState) => forumStateSelector(state)?.messages;

export const selectTopics = (state: TRootState) => forumStateSelector(state)?.forumData;
