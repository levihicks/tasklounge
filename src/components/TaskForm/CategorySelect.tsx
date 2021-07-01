import React from 'react';
import styled from 'styled-components';
import TaskFormInputContainer from './TaskFormInputContainer';
import AddIcon from '../../assets/add-orange.png'

const DummyCategories = ['Programming', 'Design', 'Investing'];

const Checkbox = styled.div<{checked: Boolean}>`
    height: 25px;
    width: 25px;
    border: 3px solid ${props => props.theme.colors.orange};
    background: ${props => props.checked ? props.theme.colors.orange : props.theme.colors.white};
    cursor: pointer;
    margin-right: 5px;
`;

const Categories = styled.div`
    margin: 20px;
`;

const Category = styled.div`
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    color: inherit;
    font-weight: bold;
`;

const AddCategory = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors.orange};
`;

const StyledAddIcon = styled.img`
    margin: 0 10px;
`;

const AddCategoryInput = styled.input`
    color: ${props => props.theme.colors.orange};
    font-size: ${props => props.theme.fontSizes.medium};
    background: none;
    border: none;
    outline: none;
    &::placeholder {
        color: ${props => props.theme.colors.orange};
    }
`;

interface CategorySelectProps {
    headingText: string;
    selectedCategories: string[];
    toggleCategory: (category: string) => void;
}

const CategorySelect = ({ headingText, selectedCategories, toggleCategory }: CategorySelectProps) => {
    return (
        <>
            <TaskFormInputContainer headingText={headingText}>
                <Categories>
                    {DummyCategories.map((c) => {
                        return (
                            <Category key={c}>
                                <Checkbox 
                                    checked={selectedCategories.includes(c)} 
                                    onClick={() => toggleCategory(c)}>
                                </Checkbox> 
                                {c}
                            </Category>
                        );
                    })}
                </Categories>
            </TaskFormInputContainer>
            <AddCategory>
                <StyledAddIcon alt='' src={AddIcon} />
                <AddCategoryInput placeholder='Add category...' />
            </AddCategory>
        </>
    )
};

export default CategorySelect;