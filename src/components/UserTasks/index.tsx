import React, { useState } from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';
import * as progressStates from '../../constants/progressStates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faWindowClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import theme from '../../theme';
import Modal from '../UI/Modal';
import CategorySelect from '../TaskForm/CategorySelect';

interface UserTasksOptionProps {
    selected?: Boolean;
}

const StyledUserTasks = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserTasksHeading = styled.div`
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: bold;
`;

const UserTasksOption = styled.span<UserTasksOptionProps>`
    margin-right: 15px;
    color: ${(props) => (props.selected) ? props.theme.colors.orange : props.theme.colors.gray};
    background: none;
    border: none;
    cursor: pointer;
    padding: none;
`;

const StyledIcon = styled.div`
    cursor: pointer;
    display: inline-block;
    margin-left: 4px;

    &:hover {
        opacity: 0.5;
    }
`;

const StyledModal = styled(Modal)`
    min-height: 300px;
    padding: 50px;
    padding-bottom: 25px;
    color: ${props => props.theme.colors.orange};
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CategoryBubbles = styled.div`
    display: flex;
`;

const CategoryBubble = styled.div`
    background-color: ${props => props.theme.colors.orange};
    color: ${props => props.theme.colors.white};
    border-radius: 20px;
    height: 30px;
    min-width: 100px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-weight: bold;
    margin-right: 5px;
`;

const UserTasks = () => {
    const [selectedProgressState, setSelectedProgressState] = useState(progressStates.TO_BEGIN);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

    const isSelected = (progressState: number) => selectedProgressState === progressState;

    const hideCategory = (category: string) => {
        const filteredCategoriesCopy = [...filteredCategories];
        filteredCategoriesCopy.splice(filteredCategories.indexOf(category), 1);
        setFilteredCategories(filteredCategoriesCopy);
    };

    return (
        <StyledUserTasks>
            <UserTasksHeading>
                My tasks
                <StyledIcon onClick={() => setFilterModalOpen(true)}>
                    <FontAwesomeIcon 
                        icon={faFilter} 
                        color={theme.colors.orange} 
                        size='sm' />
                </StyledIcon>
            </UserTasksHeading>
            {filterModalOpen && 
                <StyledModal hide={() => setFilterModalOpen(false)}>
                    <StyledIcon 
                        style={{position: 'absolute', top: 20, left: 20}} 
                        onClick={() => setFilterModalOpen(false)}>
                        <FontAwesomeIcon icon={faWindowClose} size='2x' />
                    </StyledIcon>
                    <CategorySelect 
                        headingText='Filter Categories'
                        selectedCategories={filteredCategories}
                        callbackFn={setFilteredCategories}  />
                </StyledModal>
            }
            <div style={{ margin: '10px 0' }}>
                <UserTasksOption 
                    selected={isSelected(progressStates.TO_BEGIN)}
                    onClick={() => setSelectedProgressState(progressStates.TO_BEGIN)}>
                    To begin
                </UserTasksOption>
                <UserTasksOption 
                    selected={isSelected(progressStates.IN_PROGRESS)}
                    onClick={() => setSelectedProgressState(progressStates.IN_PROGRESS)}>
                    In progress
                </UserTasksOption>
                <UserTasksOption 
                    selected={isSelected(progressStates.COMPLETED)}
                    onClick={() => setSelectedProgressState(progressStates.COMPLETED)}>
                    Completed
                </UserTasksOption>
            </div>
            {   
                filteredCategories.length > 0 &&
                <CategoryBubbles>
                    {filteredCategories.map(c => 
                        <CategoryBubble key={Math.random()}>
                            {c}
                            <StyledIcon 
                                style={{ marginLeft: '10px' }}
                                onClick={() => hideCategory(c)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </StyledIcon>
                        </CategoryBubble>
                    )}
                </CategoryBubbles>
            }
            <TaskList 
                progressState={selectedProgressState} 
                filteredCategories={filteredCategories} />
        </StyledUserTasks>
    );
};

export default UserTasks;