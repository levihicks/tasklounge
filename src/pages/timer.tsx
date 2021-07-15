import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import theme from '../theme';
import RegularTimerIcon from '../assets/timer.png';
import PomodoroTimerIcon from '../assets/tomato.png';

const getPeriodColor = (period: string | undefined) => {
    switch(period) {
        case 'pomodoro':
            return theme.colors.red;
        case 'shortBreak':
            return theme.colors.orange;
        case 'longBreak':
            return theme.colors.blue;
        default: 
            return theme.colors.navy;
    }
};

const StyledTimer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 800px;
    margin-top: 30px;
`;

const TimerHeading = styled.div`
    font-size: ${props => props.theme.fontSizes.large};
    font-weight: bold;
`;

const Row = styled.div`
    display: flex;
    margin: 10px 0;
`;

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

const Time = styled.div`
    font-size: ${props => props.theme.fontSizes.extraLarge};
    font-weight: bold;
`;

const TimerButton = styled.div`
    cursor: pointer;
    background: ${props => props.theme.colors.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    margin: 0 10px;

    &:hover {
        opacity: 0.8;
    }
`;

const SmallTimerButton = styled(TimerButton)`
    height: 40px;
    width: 40px;
    border-radius: 20px;
`;

const ProgressBubble = styled.div<{active?: boolean, period: string}>`
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${props => getPeriodColor(props.period)};
    opacity: ${props => props.active ? '1' : '0.5'};
    margin: 0px 2px;
`;

const PomodoroOption = styled.div`
    margin: 0 10px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.medium};
`;

const PomodoroOptionInput = styled.div<{period?: string}>`
    margin-top: 10px;
    color: ${props => getPeriodColor(props.period)};
`;

const Timer = () => {
    const [pomodoroMode, setPomodoroMode] = useState(false);

    return (
        <StyledTimer>
            <TimerHeading>Timer</TimerHeading>
            <Row>
                <TimerModeOption active={!pomodoroMode} onClick={() => setPomodoroMode(false)}>
                    <TimerIcon src={RegularTimerIcon} alt='' />
                    Regular
                </TimerModeOption>
                <TimerModeOption active={pomodoroMode} onClick={() => setPomodoroMode(true)}>
                    <TimerIcon src={PomodoroTimerIcon} alt='' />
                    Pomodoro
                </TimerModeOption>
            </Row>
            
            <Time>00 : 00 : 00</Time>
            <Row>
                <TimerButton>
                    <FontAwesomeIcon icon={faPause} color={theme.colors.white} size='2x' />
                </TimerButton>
                <TimerButton>
                    <FontAwesomeIcon icon={faPlay} color={theme.colors.white} size='2x' />
                </TimerButton>
            </Row>
            <Row>
                <SmallTimerButton>
                    <FontAwesomeIcon icon={faVolumeMute} color={theme.colors.white} />
                </SmallTimerButton>
                <SmallTimerButton>
                    <FontAwesomeIcon icon={faVolumeUp} color={theme.colors.white} />
                </SmallTimerButton>
            </Row>
            {pomodoroMode && 
                <><Row>
                    <ProgressBubble period='pomodoro' active/>
                    <ProgressBubble period='shortBreak' />
                    <ProgressBubble period='pomodoro' />
                    <ProgressBubble period='longBreak' />
                </Row>
                <Row>
                    <PomodoroOption>
                        Work
                        <PomodoroOptionInput period='pomodoro'>0:25:00</PomodoroOptionInput>
                    </PomodoroOption>
                    <PomodoroOption>
                        Short break
                        <PomodoroOptionInput period='shortBreak'>0:05:00</PomodoroOptionInput>
                    </PomodoroOption>
                    <PomodoroOption>
                        Long break
                        <PomodoroOptionInput period='longBreak'>0:15:00</PomodoroOptionInput>
                    </PomodoroOption>
                    <PomodoroOption>
                        Intervals
                        <PomodoroOptionInput>4</PomodoroOptionInput>
                    </PomodoroOption>
                </Row></>}
        </StyledTimer>
    );
};

export default Timer;