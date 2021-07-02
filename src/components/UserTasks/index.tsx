import React, { useState } from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';
import * as progressStates from '../../constants/progressStates';

interface UserTasksOptionProps {
    selected?: Boolean;
}

const StyledUserTasks = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserTasksHeading = styled.div`
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: bold;
`;

const UserTasksOption = styled.span<UserTasksOptionProps>`
    margin-right: 15px;
    color: ${(props) => (props.selected) ? props.theme.colors.orange : props.theme.colors.gray};
    background: none;
    border: none;
    cursor: pointer;
    padding: none;
`;

const UserTasks = () => {
    const [selectedProgressState, setSelectedProgressState] = useState(progressStates.TO_BEGIN);

    const isSelected = (progressState: number) => selectedProgressState === progressState;

    return (
        <StyledUserTasks>
            <UserTasksHeading>My tasks</UserTasksHeading>
            <div style={{ margin: '10px 0' }}>
                <UserTasksOption 
                    selected={isSelected(progressStates.TO_BEGIN)}
                    onClick={() => setSelectedProgressState(progressStates.TO_BEGIN)}>
                    To begin
                </UserTasksOption>
                <UserTasksOption 
                    selected={isSelected(progressStates.IN_PROGRESS)}
                    onClick={() => setSelectedProgressState(progressStates.IN_PROGRESS)}>
                    In progress
                </UserTasksOption>
                <UserTasksOption 
                    selected={isSelected(progressStates.COMPLETED)}
                    onClick={() => setSelectedProgressState(progressStates.COMPLETED)}>
                    Completed
                </UserTasksOption>
            </div>
            <TaskList progressState={selectedProgressState} />
        </StyledUserTasks>
    );
};

export default UserTasks;