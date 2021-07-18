import React from 'react';
import styled from 'styled-components';
import TimerModeOptions from '../components/TimerModeOptions';
import TimerHeading from '../components/TimerHeading';
import TimerDisplay from '../components/TimerDisplay';
import TimerOptions from '../components/TimerOptions';
import DurationOptions from '../components/DurationOptions';

const StyledTimer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 800px;
    margin-top: 30px;
`;

const Row = styled.div`
    display: flex;
    margin: 10px 0;
`;

const Timer = () => {
    return (
        <StyledTimer>
            <TimerHeading />
            <Row><TimerModeOptions /></Row>
            <TimerDisplay />
            <Row><TimerOptions /></Row>
            <DurationOptions />
        </StyledTimer>
    );
};

export default Timer;