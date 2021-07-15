import React from 'react';
import { useHistory } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import Card from '../UI/Card';
import RightArrow from '../../assets/right-arrow.png';

const StyledTimerNotice = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
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
`;

const StyledCard = styled(Card)`
    margin: 50px 0;
`;

const TimerNotice = () => {
    let history = useHistory();

    const clickHandler = () => {
        history.push(ROUTES.TIMER);
    };

    return (
        <StyledCard>
            <StyledTimerNotice>
                <TitleAndDescription>
                    <div>Timer</div>
                    <Description>Featuring the Pomodoro Method!</Description>
                </TitleAndDescription>
                <GoToButton onClick={clickHandler}>
                    <img alt='' src={RightArrow} height='20' />
                </GoToButton>
            </StyledTimerNotice>
        </StyledCard>
    );
};

export default TimerNotice;