import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import * as progressStates from '../../constants/progressStates';

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
    const user = useContext(AuthContext);
    const tasks = useAppSelector(state => state.tasks.tasks);
    const taskCountStrings: string[] = [];
    for(let i = 0; i <= 2; i++) {
        const taskCount = tasks.filter(t => t.progressState === i).length;
        taskCountStrings.push(
            `${taskCount} task${taskCount !== 1 ? 's' : ''}`
        );
    }

    return (
        <StyledDashboardGreeting>
            Hello{user && `, ${user.displayName}`}!
            <StyledProgressSummary>
                {tasks.length === 0 
                ? 'No tasks to show. Add one to get started!' 
                : 
                    <>
                        You have <span className='progress-metric'>
                        {taskCountStrings[progressStates.TO_BEGIN]}
                        </span> to get started on, <span className='progress-metric'>
                        {taskCountStrings[progressStates.IN_PROGRESS]}</span> in progress,
                        and <span className='progress-metric'>
                        {taskCountStrings[progressStates.COMPLETED]}</span> completed.
                    </>}
            </StyledProgressSummary>
        </StyledDashboardGreeting>
    );
};

export default DashboardGreeting;