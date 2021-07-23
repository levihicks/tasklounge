import React from 'react';
import { useHistory } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import Card from '../UI/Card';
import RightArrow from '../../assets/right-arrow.png';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import TimerDisplay from '../TimerDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const StyledTimerNotice = styled.div<{ visible?: boolean }>`
    justify-content: space-around;
    align-items: center;
    display: ${props => props.visible ? 'flex' : 'none'};
`;

const TitleAndDescription = styled.div`
    display: flex;
    flex-direction: column;
`;

const Description = styled.div`
    color: ${props => props.theme.colors.gray};
`;

const GoToButton = styled.div`
    background: ${props => props.theme.colors.orange};
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;

    &:hover { 
        opacity: 0.7;
    }
`;

const StyledCard = styled(Card)`
    margin: 50px 0;
`;

const StyledTimerDisplay = styled(TimerDisplay)`
`;

const TimerNotice = () => {
    let history = useHistory();
    const endTime = useAppSelector(state => state.timer.endTime);

    const clickHandler = () => {
        history.push(ROUTES.TIMER);
    };

    return (
        <StyledCard>
            <StyledTimerNotice visible={!endTime}>
                <TitleAndDescription>
                    <div>Timer</div>
                    <Description>
                        Featuring the Pomodoro Method!
                    </Description>
                </TitleAndDescription>
                <GoToButton onClick={clickHandler}>
                    <img alt='' src={RightArrow} height='20' />
                </GoToButton>
            </StyledTimerNotice>
            <StyledTimerNotice visible={!!endTime}>
                <FontAwesomeIcon icon={faClock} size='3x'/>
                <StyledTimerDisplay />
            </StyledTimerNotice>
        </StyledCard>
    );
};

export default TimerNotice;