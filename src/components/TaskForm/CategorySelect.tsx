import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskFormInputContainer from './TaskFormInputContainer';
import AddIcon from '../../assets/add-orange.png'
import { userCategoriesRef } from '../../services/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { replaceCategories, replaceTasks, setCategories } from '../../store/tasksSlice';
import Task from '../../models/task';

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
    border-bottom: 2px solid ${props => props.theme.colors.orange};
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
`;

const StyledAddIcon = styled.img`
    height: 10px;
    margin: 0 10px;
`;

const StyledDeleteIcon = styled.img`
    transform: rotate(45deg);
    margin-left: 5px;
    display: none;
    cursor: pointer;

    div:hover > & {
        display: inline;
    }

    &:hover {
        opacity: 0.5;
    }
`;

const AddCategoryInput = styled.input`
    color: ${props => props.theme.colors.orange};
    font-size: ${props => props.theme.fontSizes.small};
    flex-grow: 1;
    font-weight: bold;
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

    const [addCategoryInput, setAddCategoryInput] = useState('');
    const user = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.tasks.categories);
    const tasks = useAppSelector(state => state.tasks.tasks);


    useEffect(() => {
        if (user) {
            let listener = userCategoriesRef(user.uid).on('value', (snapshot) => {
                const data = snapshot.val();
                dispatch(replaceCategories(data));
            });
            return () => {
                if (user)
                    userCategoriesRef(user.uid).off('value', listener);
            }
        }
    }, [user, dispatch])

    const enterPressHandler = () => {
        if (user)
            dispatch(setCategories({
                uid: user.uid, 
                newCategories: [...categories, addCategoryInput]
            }));
        setAddCategoryInput('');
    };

    const deleteCategoryHandler = (category: string) => {
        const filteredTasks: {[key: string]: Task} = {};

        tasks.forEach(t => {
            if (t.id) {
                filteredTasks[t.id] = {...t};
                delete filteredTasks[t.id!].id;
            }
        });
        
        if (user) {
            dispatch(setCategories({
                uid: user.uid, 
                newCategories: [...categories].filter(c => c !== category)
            }));
            replaceTasks(filteredTasks);
        }
        
    };

    return (
        <>
            <TaskFormInputContainer headingText={headingText}>
                <Categories>
                    {categories.length > 0 ? categories.map((c) => {
                        return (
                            <Category key={Math.random()}>
                                <Checkbox 
                                    checked={selectedCategories.includes(c)} 
                                    onClick={() => toggleCategory(c)}>
                                </Checkbox> 
                                {c}
                                <StyledDeleteIcon onClick={() => deleteCategoryHandler(c)} src={AddIcon} alt='' />
                            </Category>
                        );
                    }) : 'No categories. Add some to organize your tasks.'}
                </Categories>
            </TaskFormInputContainer>
            <AddCategory>
                <StyledAddIcon alt='' src={AddIcon} />
                <AddCategoryInput 
                    onKeyPress={(event) => event.key === 'Enter' && enterPressHandler()} 
                    onChange={(event) => setAddCategoryInput(event.target.value)} 
                    placeholder='Add category...'
                    value={addCategoryInput} />
                <span>{addCategoryInput.length > 0 && '("Enter" to add)'}</span>
            </AddCategory>
        </>
    )
};

export default CategorySelect;