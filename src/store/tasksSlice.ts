import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../models/task';

const DummyTasks = [
    {
        title: 'Yo',
        id: String(Math.random()),
        description: 'This is a task.',
        deadline: '2021-07-03',
        categories: [
            'Programming'
        ],
        progressState: 0
    },
    {
        title: 'Yo again',
        id: String(Math.random()),
        description: 'This is a task.',
        deadline: '2020-01-01',
        categories: [
            'Programming'
        ],
        progressState: 1
    },
    {
        title: 'Yo again fren',
        id: String(Math.random()),
        description: 'This is a task.',
        deadline: '2021-11-04',
        categories: [
            'Programming'
        ],
        progressState: 2
    },
];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [...DummyTasks] as Task[]
    },
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload)   
        },
        updateTaskProgress: (state, action: PayloadAction<string>) => {
            let taskToUpdate = state.tasks.find(t => t.id === action.payload);
            taskToUpdate && taskToUpdate.progressState++;
        }
    }
});

export const { addTask, removeTask, updateTaskProgress } = tasksSlice.actions;

export default tasksSlice.reducer;