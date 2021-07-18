import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { 
    setRegularDuration as setRegularDurationAction,
    setPomodoroDuration as setPomodoroDurationAction } from '../../store/timerSlice';
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

const Row = styled.div`
    display: flex;
    margin: 10px 0;
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
    const timerState = useAppSelector(state => state.timer);
    const [regularDuration, setRegularDuration] = useState<number | ''>(10);
    const [pomodoroDuration, setPomodoroDuration] = useState<number | ''>(25);
    const [shortBreakDuration, setShortBreakDuration] = useState<number | ''>(5);
    const [longBreakDuration, setLongBreakDuration] = useState<number | ''>(15);
    const [intervals, setIntervals] = useState<number>(4);
    const dispatch = useAppDispatch();
    
    const durationInputHandler = (inputValue: string, callback: (val: number | '') => void) => {
        if (inputValue === '') 
            callback('');
        else if (!isNaN(Number(inputValue)))
            callback(Number(inputValue));
    }

    const chevronClickHandler = (val: 1 | -1) => {
        if (intervals + val > 0)
            setIntervals(intervals + val);
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
                <ProgressBubble period='pomodoro' active/>
                {Array.from(Array(intervals - 1)).map((i) => 
                    <div style={{display: 'flex'}} key={Math.random()}>
                        <ProgressBubble period='shortBreak' />
                        <ProgressBubble period='pomodoro' />
                    </div>
                )}
                <ProgressBubble period='longBreak' />
            </Row>
            <Row>
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
                            {intervals}
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