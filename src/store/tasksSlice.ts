import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../models/task';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[],
        categories: [] as string[]
    },
    reducers: {
        replaceTasks: (state, action: PayloadAction<{[key: string]: Task}>) => {
            if (action.payload) {
                let newTasks: Task[] = Object.keys(action.payload).map(taskId => {
                    return {...action.payload[taskId], id: taskId};
                });
                state.tasks = newTasks;
            } 
            else {
                state.tasks = [];
            }
        },
        replaceCategories: (state, action: PayloadAction<string[]>) => {
                state.categories = action.payload || [];
        }
    },
});

export const { replaceTasks, replaceCategories } = tasksSlice.actions;

export default tasksSlice.reducer;