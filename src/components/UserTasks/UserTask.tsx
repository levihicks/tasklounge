import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../UI/Card';
import Popover from '../UI/Popover';
import OptionsButtonImage from '../../assets/options-button.png';
import DeadlineIcon from '../../assets/deadline.png';
import Task from '../../models/task';
import * as progressStates from '../../constants/progressStates';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { removeTask, updateTaskProgress } from '../../store/tasksSlice';

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

const StyledPopover = styled(Popover)`
    position: absolute;
    left: 101%;
    border-radius: 10px;
    min-width: 80px;
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
    const [optionsButtonClicked, setOptionsButtonClicked] = useState(false);
    const dispatch = useAppDispatch();

    return(
        <StyledCard>
            <TitleAndOptionsButton>
                <TaskTitle>{task.title}</TaskTitle>
                <StyledOptionsButton onClick={() => setOptionsButtonClicked(!optionsButtonClicked)}>
                    <img alt='' src={OptionsButtonImage} />
                </StyledOptionsButton>
                {
                    optionsButtonClicked && 
                    <StyledPopover>
                        <OptionsPopoverButton>
                            Edit
                        </OptionsPopoverButton>
                        <OptionsPopoverButton onClick={() => dispatch(removeTask(task.id))}>
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
                <UpdateProgressButton onClick={() => dispatch(updateTaskProgress(task.id))}>
                    {task.progressState === progressStates.TO_BEGIN 
                    ? "Mark as in progress" 
                    : task.progressState === progressStates.IN_PROGRESS 
                    ? "Mark as completed" : ""} 
                </UpdateProgressButton>
            </TaskFooter>
        </StyledCard>
    );
};

export default UserTask;