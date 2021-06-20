import React from 'react';
import styled from 'styled-components';

const DummyUpcomingTasks = [
    { 
        date: 'June 15', 
        tasks: [
            {
                title: 'Make one app',
                time: '9:00 am'
            },
            {
                title: 'Make one app',
            },
        ]   
    },
    {
        date: 'June 16',
        tasks: [
            {
                title: 'Make a third app',
                time: '8:00 pm'
            }
        ]
    }
];

const TaskDate = styled.div`
    color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.fontSizes.extraSmall};
    margin: 20px 0;
`;

const TaskTitle = styled.div`
    font-weight: bold;
`;

const TaskTime = styled.div`
    color: ${props => props.theme.colors.gray};
`;

const UpcomingTask = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const UpcomingTasksList = () => {
    return (
        <div style={{ marginTop: '10px' }}>
            {DummyUpcomingTasks.map(d => {
                return (
                    <>
                        <TaskDate>{d.date}</TaskDate>
                        {d.tasks.map(t => {
                            return (
                                <UpcomingTask>
                                    <TaskTitle>{t.title}</TaskTitle> 
                                    <TaskTime>{t.time}</TaskTime>
                                </UpcomingTask>
                            );
                        })}
                    </>
                );
            }) }
        </div>
    );
};

export default UpcomingTasksList;