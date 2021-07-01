import React from 'react';
import styled from 'styled-components';
import TaskFormInputContainer from './TaskFormInputContainer';

const TextArea = styled.textarea`
    height: 80px;
    outline: none;
    border: none;
    font-size: ${props => props.theme.fontSizes.medium};
    color: inherit;
    background: none;
    max-width: 100%;
    font: inherit;
    margin: 20px 0;
`;

const TaskFormTextArea = ({ headingText, change }: { headingText: string, change: (e: any) => void }) => {
    return (
        <TaskFormInputContainer headingText={headingText}>
            <TextArea onChange={change}></TextArea>  
        </TaskFormInputContainer>
    );
};

export default TaskFormTextArea;