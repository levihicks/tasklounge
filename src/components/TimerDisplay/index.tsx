import React from 'react';
import styled from 'styled-components';

const StyledTimerDisplay = styled.div`
    font-size: ${props => props.theme.fontSizes.extraLarge};
    font-weight: bold;
    margin: 20px 0;
`;

const TimerDisplay = () => {
    return (
        <StyledTimerDisplay>00 : 00 : 00</StyledTimerDisplay>
    );
};

export default TimerDisplay;