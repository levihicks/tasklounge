import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PomodoroDuration {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
}

interface TimerState {
    pomodoroModeOn: boolean;
    muted: boolean;
    endTime: number | null;
    timeRemaining: number;
    regularDuration: number;
    pomodoroDuration: PomodoroDuration;
    pomodoroPhase: number;
    intervals: number;
    timerFinished: boolean;
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        pomodoroModeOn: false,
        muted: false,
        endTime: null,
        timeRemaining: 0,
        regularDuration: 10,
        pomodoroDuration: { 
            pomodoro: 25, 
            shortBreak: 5, 
            longBreak: 15 
        },
        pomodoroPhase: 0,
        intervals: 4,
        timerFinished: false
    } as TimerState,
    reducers: {
        setPomodoroMode: (state, action: PayloadAction<boolean>) => {
            state.pomodoroModeOn = action.payload;
        },
        setMuted: (state, action: PayloadAction<boolean>) => {
            state.muted = action.payload;
        },
        startTimer: (state, action: PayloadAction) => {
            let endTimeDate = Date.now();
            if (state.pomodoroModeOn) {
                let duration;
                if (state.pomodoroPhase === state.intervals * 2 - 1) {
                    duration = state.pomodoroDuration.longBreak;
                } else {
                    if (state.pomodoroPhase % 2 === 0)
                        duration = state.pomodoroDuration.pomodoro;
                    else 
                        duration = state.pomodoroDuration.shortBreak;
                }
                state.endTime = endTimeDate + duration * 60000;
            }
            else
                state.endTime = endTimeDate + state.regularDuration * 60000;
            if (state.timeRemaining === 0) 
                state.timeRemaining = Math.floor((state.endTime - Date.now()) / 1000);
            state.timerFinished = false;
        },
        stopTimer: (state, action: PayloadAction) => {
            state.endTime = null;
            state.timeRemaining = 0;
            state.pomodoroPhase = 0;
        },
        setRegularDuration: (state, action: PayloadAction<number>) => {
            state.regularDuration = action.payload;
        },
        setPomodoroDuration: (state, action: PayloadAction<{[key: string]: number}>) => {
            state.pomodoroDuration = { ...state.pomodoroDuration, ...action.payload};
        },
        setIntervals: (state, action: PayloadAction<number>) => {
            state.intervals = action.payload;
        },
        decrementTimeRemaining: (state) => {
            state.timeRemaining -= 1;
            if (state.timeRemaining === 0) {
                state.timerFinished = true;
                state.endTime = null;
            }
        },
        pauseTimer: (state) => {
            state.endTime = null;
        },
        incrementPomodoroPhase: (state) => {
            state.pomodoroPhase = (state.pomodoroPhase + 1) % (state.intervals * 2);
            if (state.timeRemaining !== 0) state.timeRemaining = 0;
        }
    }
});

export const { 
    setPomodoroMode, 
    setMuted, 
    startTimer, 
    stopTimer,
    setRegularDuration,
    setPomodoroDuration,
    setIntervals,
    decrementTimeRemaining,
    pauseTimer,
    incrementPomodoroPhase
} = timerSlice.actions;

export default timerSlice.reducer;