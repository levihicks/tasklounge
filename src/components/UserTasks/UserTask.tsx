import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Card from '../UI/Card';
import Popover from '../UI/Popover';
import OptionsButtonImage from '../../assets/options-button.png';
import DeadlineIcon from '../../assets/deadline.png';
import Task from '../../models/task';
import * as progressStates from '../../constants/progressStates';
import { AuthContext } from '../../contexts/AuthContext';
import TaskForm from '../TaskForm';
import { removeTask, updateTask } from '../../store/tasksSlice';
import { useAppDispatch } from '../../hooks/typedReduxHooks';

const StyledOptionsButton = styled.div`
    cursor: pointer;
    height: 15px;
    display: flex;
`;

const TitleAndOptionsButton = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
`;

const TaskTitle = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
`;

const StyledTaskDescription = styled.div`
    color: ${props => props.theme.colors.gray};
`;

const TaskFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const Deadline = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.red};
    & img {
        height: 15px;
        margin-right: 5px;
    }
`;

const UpdateProgressButton = styled.span`
    color: ${props => props.theme.colors.orange};
    font-weight: bold;
    cursor: pointer;
    &:hover {
        opacity: .8;
    }
`;

const StyledCard = styled(Card)`
    margin-top: 20px;
    position: relative;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
`;

const StyledPopover = styled(Popover)`
    position: absolute;
    left: 95%;
    top: 5%;
    border-radius: 10px;
    min-width: 80px;
    animation: ${fadeIn} 0.2s linear 1;
`;

const OptionsPopoverButton = styled.div`
    cursor: pointer;
    color: ${props => props.theme.colors.orange};
    margin: 2px 0;

    &:hover {
        font-weight: bold;
    }
`;

const UserTask = ({ task }: { task: Task }) => {
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const user = useContext(AuthContext);
    const dispatch = useAppDispatch();

    const removeTaskHandler = (taskId: string) => {
        user && dispatch(removeTask({uid: user.uid, taskId}));
    };

    const updateProgressState = (taskId: string, taskProgressState: number) => {
        user && dispatch(updateTask({
            uid: user.uid, 
            taskId, 
            newData: {progressState: taskProgressState + 1}
        }));
    };

    const openFormEdit = () => {
        setOptionsVisible(false);
        setEditFormVisible(true);
    };

    return(
        <StyledCard mouseLeave={() => setOptionsVisible(false)}>
            <TitleAndOptionsButton>
                <TaskTitle>{task.title}</TaskTitle>
                <StyledOptionsButton onMouseEnter={() => setOptionsVisible(true)} >
                    <img alt='' src={OptionsButtonImage} />
                </StyledOptionsButton>
                {
                    optionsVisible && 
                    <StyledPopover>
                        <OptionsPopoverButton onClick={openFormEdit}>
                            Edit
                        </OptionsPopoverButton>
                        <OptionsPopoverButton onClick={() => task.id && removeTaskHandler(task.id)}>
                            Remove
                        </OptionsPopoverButton>
                    </StyledPopover>
                }
            </TitleAndOptionsButton>
            <StyledTaskDescription>
                {task.description}
            </StyledTaskDescription>
            <TaskFooter>
                {task.deadline && <Deadline><img alt='' src={DeadlineIcon} />{task.deadline}</Deadline>}
                <UpdateProgressButton onClick={() => {updateProgressState(task.id!, task.progressState)}}>
                    {task.progressState === progressStates.TO_BEGIN 
                    ? "Mark as in progress" 
                    : task.progressState === progressStates.IN_PROGRESS 
                    ? "Mark as completed" : ""} 
                </UpdateProgressButton>
            </TaskFooter>
            {
                editFormVisible && <TaskForm initialTask={task} hide={() => setEditFormVisible(false)} />
            }
        </StyledCard>
    );
};

export default UserTask;