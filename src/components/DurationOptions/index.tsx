import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { 
    setRegularDuration as setRegularDurationAction,
    setPomodoroDuration as setPomodoroDurationAction,
    setIntervals } from '../../store/timerSlice';
import theme from '../../theme';

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

const ProgressBubble = styled.div<{active?: boolean, period: string}>`
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${props => getPeriodColor(props.period)};
    opacity: ${props => props.active ? '1' : '0.5'};
    margin: 0px 2px;
`;

const DurationOption = styled.div`
    margin: 0 10px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: ${props => props.theme.fontSizes.medium};
`;

const OptionInputContainer = styled.div<{period?: string}>`
    margin-top: 10px;
    color: ${props => getPeriodColor(props.period)};
    font-size: ${props => props.theme.fontSizes.small};
    display: flex;
    flex-direction: column;
`;

const Row = styled.div<{ columnFormat?: boolean }>`
    display: flex;
    margin: 10px 0;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        flex-direction: ${props => props.columnFormat ? 'column' : 'row'};
        ${props => props.columnFormat && 'padding-bottom: 20px;'}

        & > div {
            ${props => props.columnFormat && 'margin: 10px 0;'}
        }
    }
`;

const OptionInput = styled.input`
    outline: none;
    border: none;
    width: 100px;
    font-weight: bold;
    font-family: inherit;
    font-size:  ${props => props.theme.fontSizes.large};
    color: inherit;
    &::placeholder {
        color: inherit;
        opacity: 0.5;
    }
`;

const Chevrons = styled.div`
    display: flex;
    flex-direction: column;
`;

const Chevron = styled.div`
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const DurationOptions = () => {
    const dispatch = useAppDispatch();
    const timerState = useAppSelector(state => state.timer);
    
    const [regularDuration, setRegularDuration] = useState<number | ''>(10);
    const [pomodoroDuration, setPomodoroDuration] = useState<number | ''>(25);
    const [shortBreakDuration, setShortBreakDuration] = useState<number | ''>(5);
    const [longBreakDuration, setLongBreakDuration] = useState<number | ''>(15);
    
    const durationInputHandler = (inputValue: string, callback: (val: number | '') => void) => {
        if (inputValue === '') 
            callback('');
        else if (!isNaN(Number(inputValue)))
            callback(Number(inputValue));
    }

    const chevronClickHandler = (val: 1 | -1) => {
        if (timerState.intervals + val > 0)
            dispatch(setIntervals(timerState.intervals + val));
    }

    const updateDurationOption = (
        stateVal: number | '', 
        stateValSetter: (val: number | '') => void,
        field?: 'pomodoro' | 'shortBreak' | 'longBreak') => {
            if (stateVal !== '') {
                if(!timerState.pomodoroModeOn) 
                    dispatch(setRegularDurationAction(stateVal));
                else 
                    dispatch(setPomodoroDurationAction({ [field!]: stateVal }))
            }
            else {
                stateValSetter(timerState.pomodoroModeOn ? 
                    timerState.pomodoroDuration[field!] : timerState.regularDuration)
            }       
    }

    const focusOutHandler = (field: string) => {
        switch(field) {
            case 'regular': 
                updateDurationOption(regularDuration, setRegularDuration);
                break;
            case 'pomodoro':
                updateDurationOption(pomodoroDuration, setPomodoroDuration, field);
                break;
            case 'shortBreak':
                updateDurationOption(shortBreakDuration, setShortBreakDuration, field);
                break;
            case 'longBreak':
                updateDurationOption(longBreakDuration, setLongBreakDuration, field);
                break;
        }
    };

    return <>{timerState.pomodoroModeOn ? 
        (<>
            <Row>
                <ProgressBubble 
                    period='pomodoro' 
                    active={timerState.pomodoroPhase === 0}/>
                {Array.from(Array(timerState.intervals - 1)).map((i, index) => 
                    <div style={{display: 'flex'}} key={Math.random()}>
                        <ProgressBubble 
                            period='shortBreak'
                            active={timerState.pomodoroPhase === index * 2 + 1} />
                        <ProgressBubble 
                            period='pomodoro'
                            active={timerState.pomodoroPhase === index * 2 + 2} />
                    </div>
                )}
                <ProgressBubble 
                    period='longBreak' 
                    active={timerState.pomodoroPhase === timerState.intervals * 2 - 1} />
            </Row>
            <Row columnFormat={true}>
                <DurationOption>
                    Work
                    <OptionInputContainer period='pomodoro'>
                        <OptionInput
                            value={pomodoroDuration}
                            placeholder={'0'}
                            onChange={(event) => 
                                durationInputHandler(event.target.value, setPomodoroDuration)
                            }
                            onBlur={() => focusOutHandler('pomodoro')} />
                        minutes
                    </OptionInputContainer>
                </DurationOption>
                <DurationOption>
                    Short break
                    <OptionInputContainer period='shortBreak'>
                        <OptionInput
                            value={shortBreakDuration}
                            placeholder={'0'}
                            onChange={(event) => 
                                durationInputHandler(event.target.value, setShortBreakDuration)
                            } 
                            onBlur={() => focusOutHandler('shortBreak')} />
                        minutes
                    </OptionInputContainer>
                </DurationOption>
                <DurationOption>
                    Long break
                    <OptionInputContainer period='longBreak'>
                        <OptionInput
                            value={longBreakDuration}
                            placeholder={'0'}
                            onChange={(event) => 
                                durationInputHandler(event.target.value, setLongBreakDuration)
                            } 
                            onBlur={() => focusOutHandler('longBreak')} />
                        minutes
                    </OptionInputContainer>
                </DurationOption>
                <DurationOption>
                    Intervals
                    <OptionInputContainer style={{ flexDirection: 'row', width: '80px' }}>
                        <OptionInput as='div'>
                            {timerState.intervals}
                        </OptionInput>
                        <Chevrons>
                            <Chevron onClick={() => chevronClickHandler(1)}>
                                <FontAwesomeIcon 
                                    icon={faChevronUp} 
                                    color={theme.colors.orange} />
                            </Chevron>
                            <Chevron onClick={() => chevronClickHandler(-1)}>
                                <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    color={theme.colors.orange} />
                            </Chevron>
                        </Chevrons>
                    </OptionInputContainer>
                </DurationOption>
            </Row>
        </>) :
        <DurationOption>
            Duration
            <OptionInputContainer>
                <OptionInput
                    value={regularDuration}
                    placeholder={'0'}
                    onChange={(event) => durationInputHandler(event.target.value, setRegularDuration)}
                    onBlur={() => focusOutHandler('regular')} />
                minutes
            </OptionInputContainer>
        </DurationOption>}</>;
};

export default DurationOptions;