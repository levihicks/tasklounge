import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../models/task';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[]
    },
    reducers: {
        replaceTasks: (state, action: PayloadAction<{[key: string]: Task}>) => {
            if (action.payload) {
                let test: Task[] = Object.keys(action.payload).map(taskId => {
                    return {...action.payload[taskId], id: taskId};
                });
                state.tasks = test;
            } 
            else {
                state.tasks = [];
            }
        }
    },
});

export const { replaceTasks } = tasksSlice.actions;

export default tasksSlice.reducer;