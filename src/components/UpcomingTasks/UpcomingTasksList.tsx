import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import Task from '../../models/task';
import convertTimeString from '../../utils/convertTimeString';

const TaskDate = styled.div`
    color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.fontSizes.extraSmall};
    margin: 10px 0 5px 0;
`;

const TaskTitle = styled.div`
    font-weight: bold;
`;

const UpcomingTask = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 0 5px 5px;
    background: #f0f0f0;
`;

const NoUpcomingTasksMessage = styled.div`
    color: ${props => props.theme.colors.gray};
    text-align: center;
    margin-top: 30px;
`;

interface TaskWithDeadline {
    deadline: string;
}

interface TasksByDate { 
    [key: string]: Array<{title: string, id: string}>; 
}

const UpcomingTasksList = () => {
    const tasks = useAppSelector(state => state.tasks.tasks);
    const [tasksSortedByDate, setTasksSortedByDate] = useState({} as TasksByDate);

    const sortByDate = useCallback(() => {
        const tasksWithDeadlines: Task[] = tasks.filter(t => 
            t.deadline && t.progressState !== 2
        );
        if (tasksWithDeadlines.length === 0) setTasksSortedByDate({});
        tasksWithDeadlines.sort((x: Task, y: Task) => {
            const [xDeadline, yDeadline] = [
                (x as TaskWithDeadline).deadline, 
                (y as TaskWithDeadline).deadline];
            if (xDeadline > yDeadline) return 1;
            else if (xDeadline < yDeadline) return -1;
            else return 0;
        });
        const tasksByDateObj: TasksByDate = {};
        tasksWithDeadlines.forEach(t => {
            const taskDeadline = (t as TaskWithDeadline).deadline;
            if (taskDeadline in tasksByDateObj) 
                tasksByDateObj[taskDeadline].push({title: t.title, id: t.id!});
            else  
                tasksByDateObj[taskDeadline] = [{title: t.title, id: t.id!}];
        });
        setTasksSortedByDate(tasksByDateObj);
    }, [tasks]);

    useEffect(sortByDate, [tasks, sortByDate]);

    return (
        <div style={{ marginTop: '10px' }}>
            { Object.keys(tasksSortedByDate).length > 0 
                ? Object.keys(tasksSortedByDate).map((d) => {
                    return (
                        <div style={{ marginBottom: '20px' }} key={d}>
                            <TaskDate>{convertTimeString(d)}</TaskDate>
                            {tasksSortedByDate[d].map((t) => {
                                return (
                                    <UpcomingTask key={t.id}>
                                        <TaskTitle>{t.title}</TaskTitle>
                                    </UpcomingTask>
                                );
                            })}
                        </div>
                    );
                }) 
                : <NoUpcomingTasksMessage>No upcoming tasks.</NoUpcomingTasksMessage> }
        </div>
    );
};

export default UpcomingTasksList;