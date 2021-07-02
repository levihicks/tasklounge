import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import UserTask from './UserTask';

const NoTasksPlaceholder = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 2px solid ${props => props.theme.colors.lightOrange};
    color: ${props => props.theme.colors.orange};
    font-weight: bold;
    height: 180px;
    border-radius: 20px;
`;

const TaskList = ({ progressState }: { progressState: number }) => {
    const tasks = useAppSelector(state => state.tasks.tasks);

    return (
        <div>
            {
                tasks.length > 0 ?
                tasks.filter(t => t.progressState === progressState)
                    .map(t => (<UserTask task={t} key={t.id} />))
                : <NoTasksPlaceholder>No tasks.</NoTasksPlaceholder>
            }
        </div>
    );
}

export default TaskList;