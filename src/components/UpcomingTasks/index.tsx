import React from 'react';
import styled from 'styled-components';
import AddSymbol from '../../assets/add.png';
import UpcomingTasksList from './UpcomingTasksList';

const UpcomingTasksRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CurrentDateText = styled.div`
    color: ${props => props.theme.colors.gray};
`;

const HeadingText = styled.div`
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.medium};
`;

const AddTaskButton = styled.div`
    background: ${props => props.theme.colors.navy};
    outline: none;
    border: none;
    color: ${props => props.theme.colors.white};
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-radius: 15px;
    flex-grow: 1;
    cursor: pointer;
`;

const UpcomingTasks = () => {
    return (
        <div style={{ width: '100%' }}>
            <UpcomingTasksRow>
                <div style={{ flexGrow: 3 }}>
                    <CurrentDateText>June 14, 2021</CurrentDateText>
                    <HeadingText>Coming Up</HeadingText> 
                </div>
                <AddTaskButton>
                    <img alt='' src={AddSymbol} style={{ marginRight: '10px' }} />
                    Add task    
                </AddTaskButton>
            </UpcomingTasksRow>
            <UpcomingTasksList />
        </div>
    );
};

export default UpcomingTasks;