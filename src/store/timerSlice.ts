import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PomodoroDuration {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
}

interface TimerState {
    pomodoroModeOn: boolean;
    muted: boolean;
    endTime: string | null;
    regularDuration: number;
    pomodoroDuration: PomodoroDuration;
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        pomodoroModeOn: false,
        muted: false,
        endTime: null,
        regularDuration: 10,
        pomodoroDuration: { 
            pomodoro: 25, 
            shortBreak: 5, 
            longBreak: 15 
        }
    } as TimerState,
    reducers: {
        setPomodoroMode: (state, action: PayloadAction<boolean>) => {
            state.pomodoroModeOn = action.payload;
        },
        setMuted: (state, action: PayloadAction<boolean>) => {
            state.muted = action.payload;
        },
        startTimer: (state, action: PayloadAction) => {
            let endTimeDate = new Date();
            endTimeDate.setMinutes(endTimeDate.getMinutes() + state.regularDuration);
            state.endTime = endTimeDate.toString();
        },
        setRegularDuration: (state, action: PayloadAction<number>) => {
            state.regularDuration = action.payload;
        },
        setPomodoroDuration: (state, action: PayloadAction<{[key: string]: number}>) => {
            state.pomodoroDuration = { ...state.pomodoroDuration, ...action.payload};
        }
    }
});

export const { 
    setPomodoroMode, 
    setMuted, 
    startTimer, 
    setRegularDuration,
    setPomodoroDuration
} = timerSlice.actions;

export default timerSlice.reducer;