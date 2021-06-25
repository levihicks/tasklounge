import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border-radius: 30px;
    border: 1px solid ${props => props.theme.colors.orange};
    position: relative;
    padding: 0 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`; 

const Heading = styled.div`
    background: ${props => props.theme.colors.white};
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    left: 40px;
    padding: 0 10px;
    color: ${props => props.theme.colors.orange};
    font-weight: bold;
`;

const TaskFormInputContainer = ({ children, headingText }: { children: React.ReactNode, headingText?: string }) => {
    return (
        <Container>
            <Heading>{ headingText }</Heading>
            { children }
        </Container>
    );
};

export default TaskFormInputContainer;