import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeMute, faVolumeUp, faStepForward } from '@fortawesome/free-solid-svg-icons';
import theme from '../../theme';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { setMuted, startTimer } from '../../store/timerSlice';

const TimerButton = styled.div<{disabled?: boolean}>`
    cursor: ${props => props.disabled ? 'disabled' : 'pointer'};
    background: ${props => props.theme.colors.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    margin: 0 10px;
    opacity: ${props => props.disabled ? '0.8' : '1'};

    &:hover {
        opacity: 0.8;
    }
`;

const TimerOptions = () => {
    const dispatch = useAppDispatch();
    const muted = useAppSelector(state => state.timer.muted);
    const pomodoroMode = useAppSelector(state => state.timer.pomodoroModeOn);
    const beep = new Audio('/beep.mp3');

    const soundToggleHandler = () => {
        if (muted)
            beep.play();
        dispatch(setMuted(!muted));
    }

    return (
        <>
            <TimerButton disabled>
                <FontAwesomeIcon icon={faPause} color={theme.colors.white}  />
            </TimerButton>
            <TimerButton onClick={() => dispatch(startTimer())}>
                <FontAwesomeIcon icon={faPlay} color={theme.colors.white}  />
            </TimerButton>
            <TimerButton onClick={soundToggleHandler}>
                <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp} color={theme.colors.white}  />
            </TimerButton>
            {pomodoroMode && 
            <TimerButton disabled>
                <FontAwesomeIcon icon={faStepForward} color={theme.colors.white}  />
            </TimerButton>}
        </>
    );
};

export default TimerOptions;