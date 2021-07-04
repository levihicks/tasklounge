import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import TaskFormInput from './TaskFormInput';
import TaskFormTextArea from './TaskFormTextArea';
import CategorySelect from './CategorySelect';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { addTask } from '../../store/tasksSlice';
import Task from '../../models/task';

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
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [categoriesInput, setCategoriesInput] = useState<string[]>(['Design']);
    const dispatch = useAppDispatch();

    const toggleCategory = (category: string) => {
        const index = categoriesInput.indexOf(category);
        if (index === -1)
            setCategoriesInput([...categoriesInput, category]);
        else {
            const categoriesInputCopy = [...categoriesInput];
            categoriesInputCopy.splice(index, 1);
            setCategoriesInput(categoriesInputCopy);
        }
    };

    const addTaskHandler = () => {
        const newTask: Task = {
            title: titleInput,
            id: String(Math.random()),
            description: descriptionInput,
            deadline: deadlineInput,
            categories: categoriesInput,
            progressState: 0
        };
        dispatch(addTask(newTask));
    };

    return (
        <Modal hide={hide}>
            <StyledTaskForm>
                <TaskFormInput headingText='Title' change={(event) => setTitleInput(event.target.value)} />
                <TaskFormTextArea headingText='Description' change={(event) => setDescriptionInput(event.target.value)} />
                <TaskFormInput headingText='Deadline' change={(event) => setDeadlineInput(event.target.value)} type={'date'}/>
                <CategorySelect headingText='Categories' selectedCategories={categoriesInput} toggleCategory={toggleCategory} />
                <div style={{ display: 'flex' }}>
                    <AddTaskButton onClick={addTaskHandler}>Add task</AddTaskButton>
                    <CancelButton onClick={hide}>Cancel</CancelButton>
                </div>
            </StyledTaskForm>
        </Modal>
    );
};

export default TaskForm;