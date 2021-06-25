import React from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import TaskFormInput from './TaskFormInput';
import TaskFormTextArea from './TaskFormTextArea';
import CategorySelect from './CategorySelect';

const StyledTaskForm = styled.div`
    color: ${props => props.theme.colors.orange};
    margin: 15px 0;
`;

const Button = styled.div`
    margin: auto;
    margin-top: 10px;
    border-radius: 20px;
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: bold;
    padding: 3px 20px;
    text-align: center;
    width: 30%;
    cursor: pointer;
`;

const AddTaskButton = styled(Button)`
    border: 2px solid ${props => props.theme.colors.orange};
    &:hover {
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.orange};
    }
`;

const CancelButton = styled(Button)`
    border: 2px solid ${props => props.theme.colors.gray};
    color: ${props => props.theme.colors.gray};
    &:hover {
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.gray};
    }
`;

const TaskForm = ({ hide }: { hide: () => void }) => {
    return (
        <Modal hide={hide}>
            <StyledTaskForm>
                <TaskFormInput headingText='Title' />
                <TaskFormTextArea headingText='Description' />
                <TaskFormInput headingText='Date' />
                <CategorySelect headingText='Categories' />
                <div style={{ display: 'flex' }}>
                    <AddTaskButton>Add task</AddTaskButton>
                    <CancelButton onClick={hide}>Cancel</CancelButton>
                </div>
            </StyledTaskForm>
        </Modal>
    );
};

export default TaskForm;