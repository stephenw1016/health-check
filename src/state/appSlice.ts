import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

import { Category, Session } from '../types';

export interface AppState {
  categories: Record<string, Category>,
  selectedCategories: Array<string>,
  sessions: Record<string, Session>,
}

const initialState: AppState = {
  categories: {},
  selectedCategories: [],
  sessions: {},
};

export const appSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    endSession: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const activeSession = state.sessions[payload];
      activeSession.isComplete = true;
    },
    setSelectedCategories: (state, action: PayloadAction<Array<string>>) => {
      const { payload } = action;
      state.selectedCategories = payload;
    },
  },
});

export const { endSession, setSelectedCategories } = appSlice.actions;

export const getSelectedCategories = (state: RootState) => state.app.selectedCategories;

export default appSlice.reducer;
