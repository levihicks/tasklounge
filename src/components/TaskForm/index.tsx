import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import TaskFormInput from './TaskFormInput';
import TaskFormTextArea from './TaskFormTextArea';
import CategorySelect from './CategorySelect';
import { addTaskHandler, updateTaskHandler } from '../../services/firebase';
import Task from '../../models/task';
import { AuthContext } from '../../contexts/AuthContext';

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

const TaskForm = ({ hide, initialTask }: { hide: () => void, initialTask?: Task }) => {
    const user = useContext(AuthContext);

    const initialTaskValues = 
        {
            title: (initialTask && initialTask.title) || '',
            description: (initialTask && initialTask.description) || '',
            deadline: (initialTask && initialTask.deadline) || '',
            categories: (initialTask && initialTask.categories) || []
        }

    const [titleInput, setTitleInput] = useState(initialTaskValues.title);
    const [descriptionInput, setDescriptionInput] = useState(initialTaskValues.description);
    const [deadlineInput, setDeadlineInput] = useState(initialTaskValues.deadline);
    const [categoriesInput, setCategoriesInput] = useState<string[]>(initialTaskValues.categories);

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

    const submitHandler = () => {
        if (!initialTask) {
            const newTask: Task = {
                title: titleInput,
                description: descriptionInput,
                deadline: deadlineInput,
                categories: categoriesInput,
                progressState: 0
            };
            if (user)
                addTaskHandler(user.uid, newTask);
        }
        else {
            const updatedTask = {
                title: titleInput,
                description: descriptionInput,
                deadline: deadlineInput,
                categories: categoriesInput
            };
            if (user)
                updateTaskHandler(user.uid, initialTask.id!, updatedTask);
        }
        
        hide();
    };

    return (
        <Modal hide={hide}>
            <StyledTaskForm>
                <TaskFormInput 
                    headingText='Title' 
                    change={(event) => setTitleInput(event.target.value)}
                    val={titleInput} />
                <TaskFormTextArea 
                    headingText='Description' 
                    change={(event) => setDescriptionInput(event.target.value)} 
                    val={descriptionInput}/>
                <TaskFormInput 
                    headingText='Deadline' 
                    change={(event) => setDeadlineInput(event.target.value)} 
                    type={'date'}
                    val={deadlineInput}/>
                <CategorySelect 
                    headingText='Categories' 
                    selectedCategories={categoriesInput} toggleCategory={toggleCategory} />
                <div style={{ display: 'flex' }}>
                    <AddTaskButton onClick={submitHandler}>{initialTask ? 'Edit task' : 'Add task'}</AddTaskButton>
                    <CancelButton onClick={hide}>Cancel</CancelButton>
                </div>
            </StyledTaskForm>
        </Modal>
    );
};

export default TaskForm;