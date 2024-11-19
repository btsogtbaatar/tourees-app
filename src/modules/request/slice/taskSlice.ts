import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../context/app/store';
import { TaskModel } from '../entities/request.model';

export interface TaskState {
  draft?: TaskModel.TaskRequest;
}

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    draft: undefined,
  } as TaskState,
  reducers: {
    saveDraft: (state, action: PayloadAction<TaskModel.TaskRequest>) => {
      state.draft = action.payload;
    },
    clearDraft: state => {
      state.draft = undefined;
    },
  },
});

export const { saveDraft, clearDraft } = taskSlice.actions;

export const selectDraft = (state: RootState) =>
  state.task.draft;

export default taskSlice.reducer;
