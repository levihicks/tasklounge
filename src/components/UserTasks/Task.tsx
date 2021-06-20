import React from 'react';
import styled from 'styled-components';
import Card from '../UI/Card';
import OptionsButtonImage from '../../assets/options-button.png';
import DeadlineIcon from '../../assets/deadline.png';

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

const Task = () => {
    return(
        <Card styleProps={{ marginTop: '20px' }}>
            <TitleAndOptionsButton>
                <TaskTitle>Task Title</TaskTitle>
                <StyledOptionsButton><img alt="" src={OptionsButtonImage} /></StyledOptionsButton>
            </TitleAndOptionsButton>
            <StyledTaskDescription>
                This is the description of the user's task. Thank you for your time.
            </StyledTaskDescription>
            <TaskFooter>
                <Deadline><img alt='' src={DeadlineIcon} /> 6/15</Deadline>
                <UpdateProgressButton>Begin</UpdateProgressButton>
            </TaskFooter>
        </Card>
    );
};

export default Task;