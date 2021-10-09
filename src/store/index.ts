import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},
});

export type TRootState = ReturnType<typeof store.getState>;

export type TStoreDispatch = typeof store.dispatch;
