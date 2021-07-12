import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Task from '../models/task';
import { addTaskHandler, removeTaskHandler, setCategoriesHandler, updateTaskHandler } from '../services/firebase';

export const removeTask = createAsyncThunk(
    'tasks/removeTaskStatus',
    async ({uid, taskId}: {uid: string, taskId: string}, thunkAPI) => {
        await removeTaskHandler(uid, taskId);
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTaskStatus',
    async ({uid, newTask}: {uid: string, newTask: Task}, thunkAPI) => {
        await addTaskHandler(uid, newTask);
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTaskStatus',
    async ({uid, taskId, newData}: 
        {uid: string, taskId: string, newData: {[key: string]: any}
    }, thunkAPI) => {
        await updateTaskHandler(uid, taskId, newData);
    }
);

export const setCategories = createAsyncThunk(
    'tasks/setCategoriesStatus',
    async ({uid, newCategories}: {uid: string, newCategories: string[]}, thunkAPI) => {
        await setCategoriesHandler(uid, newCategories);
    }
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[],
        categories: [] as string[],
        loading: false,
        error: false
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
        },
        removeError: (state) => {
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeTask.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(removeTask.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(addTask.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addTask.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(updateTask.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(setCategories.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(setCategories.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(setCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { replaceTasks, replaceCategories, removeError } = tasksSlice.actions;

export default tasksSlice.reducer;