import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { setPomodoroMode } from '../../store/timerSlice';
import RegularTimerIcon from '../../assets/timer.png';
import PomodoroTimerIcon from '../../assets/tomato.png';

const TimerModeOption = styled.div<{active: boolean}>`
    font-size: ${props => props.theme.fontSizes.small};        
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-right: 15px;
    opacity: ${props => props.active ? '1' : '0.5'};
`;

const TimerIcon = styled.img`
    height: 32px;
    margin-right: 5px;
`;

const TimerModeOptions = () => {
    const pomodoroModeOn = useAppSelector(state => state.timer.pomodoroModeOn);
    const dispatch = useAppDispatch();

    return (
        <>
            <TimerModeOption active={!pomodoroModeOn} onClick={() => dispatch(setPomodoroMode(false))}>
                <TimerIcon src={RegularTimerIcon} alt='' />
                Regular
            </TimerModeOption>
            <TimerModeOption active={pomodoroModeOn} onClick={() => dispatch(setPomodoroMode(true))}>
                <TimerIcon src={PomodoroTimerIcon} alt='' />
                Pomodoro
            </TimerModeOption>
        </>
    );
};

export default TimerModeOptions;