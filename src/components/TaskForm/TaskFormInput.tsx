import React from 'react';
import styled from 'styled-components';
import TaskFormInputContainer from './TaskFormInputContainer';

const Input = styled.input`
    height: 80px;
    outline: none;
    border: none;
    font-size: ${props => props.theme.fontSizes.medium};
    color: inherit;
    background: none;
`;

interface TaskFormInputProps {
    headingText: string;
    change: (e: any) => void;
    type?: string
}

const TaskFormInput = ({ headingText, change, type }: TaskFormInputProps ) => {
    return (
        <TaskFormInputContainer headingText={headingText}>
            <Input onChange={change} type={type}></Input>
        </TaskFormInputContainer>
    );
};

export default TaskFormInput;

