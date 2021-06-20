import React from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';

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
    return (
        <StyledUserTasks>
            <UserTasksHeading>My tasks</UserTasksHeading>
            <div style={{ margin: "10px 0" }}>
                <UserTasksOption selected={true}>To begin</UserTasksOption>
                <UserTasksOption selected={false}>In progress</UserTasksOption>
                <UserTasksOption selected={false}>Completed</UserTasksOption>
            </div>
            <TaskList />
        </StyledUserTasks>
    );
};

export default UserTasks;