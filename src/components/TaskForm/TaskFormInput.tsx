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

const TaskFormInput = ({ headingText, change }: { headingText: string, change: (e: any) => void }) => {
    return (
        <TaskFormInputContainer headingText={headingText}>
            <Input onChange={change}></Input>
        </TaskFormInputContainer>
    );
};

export default TaskFormInput;

