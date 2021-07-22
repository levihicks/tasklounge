import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { decrementTimeRemaining, incrementPomodoroPhase, resetTimerFinished, startTimer } from '../../store/timerSlice';

const StyledTimerDisplay = styled.div`
    font-size: ${props => props.theme.fontSizes.extraLarge};
    font-weight: bold;
    margin: 20px 0;
`;

const TimerDisplay = ({className}: {className?: string}) => {
    let dispatch = useAppDispatch();
    let endTime = useAppSelector(state => state.timer.endTime);
    let timeRemaining = useAppSelector(state => state.timer.timeRemaining);
    let timerFinished = useAppSelector(state => state.timer.timerFinished);
    let pomodoroModeOn = useAppSelector(state => state.timer.pomodoroModeOn);
    let muted = useAppSelector(state => state.timer.muted);
    const timerListener = useRef<any>(null);
    const beep = useRef(new Audio('./beep.mp3'));

    const updateTimerDisplay = useCallback(() => {
        if (endTime && !timerListener.current) {
            timerListener.current = setInterval(() => {
                dispatch(decrementTimeRemaining());
            }, 1000);
        }
        return () => { 
            if (endTime && timerListener.current) {
                clearInterval(timerListener.current);
                timerListener.current = null;
            }
        };
    }, [dispatch, endTime]);

    useEffect(updateTimerDisplay, [updateTimerDisplay]);

    useEffect(() => {
        console.log('here');
        if (timerFinished) {
            console.log('and in here?');
            dispatch(resetTimerFinished());
            clearInterval(timerListener.current);
            timerListener.current = null;
            !muted && beep.current.play();
            if (pomodoroModeOn) {
                dispatch(incrementPomodoroPhase());
                dispatch(startTimer());
            }
        } 
    }, [beep, muted, timerFinished, dispatch, pomodoroModeOn]);

    useEffect(() => {
        console.log(timerFinished);
    }, [timerFinished]);

    // useEffect(timerFinishedHandler, [timerFinishedHandler]);

    const timeString = (s: number) => {
        let seconds = s % 60;
        let minutes = Math.floor(s / 60) % 60;
        let hours = Math.floor(s / 3600);
        let timeStrings = [hours, minutes, seconds].map(t => {
            return `${(t < 10 ? '0' : '') + t}`
        });
        return timeStrings.join(' : ');
    };

    return (
        <StyledTimerDisplay className={className}>{timeString(timeRemaining)}</StyledTimerDisplay>
    );
};

export default TimerDisplay;