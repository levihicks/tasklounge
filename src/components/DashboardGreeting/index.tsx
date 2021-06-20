import React from 'react';
import styled from 'styled-components';

const StyledDashboardGreeting = styled.div`
    color: ${props => props.theme.colors.gray};
`;

const StyledProgressSummary = styled.div`
    color: ${props => props.theme.colors.navy};
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: bold;
    & span.progress-metric {
        color: ${props => props.theme.colors.orange};
    }
`;

const DashboardGreeting = () => {
    return (
        <StyledDashboardGreeting>
            Hello, User!
            <StyledProgressSummary>
                You have <span className='progress-metric'>3 tasks</span> to get started on,
                <span className='progress-metric'> 7 tasks</span> in progress,
                and <span className='progress-metric'>4 tasks</span> completed.
            </StyledProgressSummary>
        </StyledDashboardGreeting>
    );
};

export default DashboardGreeting;