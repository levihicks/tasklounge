import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../models/task';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[]
    },
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        }
    }
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;