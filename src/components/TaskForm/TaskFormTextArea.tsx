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

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        height: 60px;
    }
`;

interface TaskFormTextAreaProps {
    headingText: string;
    change: (e: any) => void;
    val: string;
}

const TaskFormTextArea = ({ headingText, change, val }: TaskFormTextAreaProps) => {
    return (
        <TaskFormInputContainer headingText={headingText}>
            <TextArea onChange={change} value={val}></TextArea>  
        </TaskFormInputContainer>
    );
};

export default TaskFormTextArea;