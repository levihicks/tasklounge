import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { setPomodoroMode } from '../../store/timerSlice';

const TimerModeOption = styled.div<{active: boolean}>`
    font-size: ${props => props.theme.fontSizes.small};        
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-right: 15px;
    border-radius: 25px;
    padding: 15px;
    opacity: ${props => props.active ? '1' : '0.5'};
    ${props => props.active && `color: ${props.theme.colors.white};`}
    ${props => props.active && `background: ${props.theme.colors.navy};`}
`;

const TimerModeOptions = () => {
    const pomodoroModeOn = useAppSelector(state => state.timer.pomodoroModeOn);
    const dispatch = useAppDispatch();

    return (
        <>
            <TimerModeOption active={!pomodoroModeOn} onClick={() => dispatch(setPomodoroMode(false))}>
                Regular
            </TimerModeOption>
            <TimerModeOption active={pomodoroModeOn} onClick={() => dispatch(setPomodoroMode(true))}>
                Pomodoro
            </TimerModeOption>
        </>
    );
};

export default TimerModeOptions;