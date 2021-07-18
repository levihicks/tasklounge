import React from 'react';
import styled from 'styled-components';

const StyledTimerHeading = styled.div`
    font-size: ${props => props.theme.fontSizes.large};
    font-weight: bold;
`;

const TimerHeading = () => {
    return (<StyledTimerHeading>Timer</StyledTimerHeading>);
};

export default TimerHeading;