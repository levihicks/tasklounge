import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import Task from '../../models/task';
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
    min-width: 200px;
`;

interface TaskListProps {
    progressState: number;
    filteredCategories: string[];
}

const TaskList = ({ progressState, filteredCategories }: TaskListProps) => {
    const tasks = useAppSelector(state => state.tasks.tasks);
    const [filteredTasks, setFilteredTasks] = useState([...tasks]);

    let filterTasks = useCallback(() => {
        let newFilteredTasks: Task[] = [...tasks];
        if (newFilteredTasks.length > 0) {
            newFilteredTasks = newFilteredTasks.filter(t => 
                t.progressState === progressState
            );
            if (filteredCategories.length > 0) {
                newFilteredTasks = newFilteredTasks.filter(t => {
                    let categoryIncluded = false;
                    if (t.categories)
                        t.categories.forEach(c => {
                            if (filteredCategories.includes(c))
                                categoryIncluded = true; 
                        })
                    return categoryIncluded;
                });
            }
        } 
        setFilteredTasks([...newFilteredTasks]);
    }, [filteredCategories, progressState, tasks]);

    useEffect(filterTasks, [filterTasks]);

    return (
        <div style={{ marginBottom: '20px' }}>
            {
                filteredTasks.length > 0 ?
                filteredTasks.map(t => (<UserTask task={t} key={t.id} />))
                : <NoTasksPlaceholder>No tasks.</NoTasksPlaceholder>
            }
        </div>
    );
}

export default TaskList;