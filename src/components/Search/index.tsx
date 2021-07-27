import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.png';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import Task from '../../models/task';
import UserTask from '../UserTasks/UserTask';

const StyledSearchbox = styled.div`
    background: #E3E7E6;
    border-radius: 5px;
    padding: 10px;
    margin: 30px 0;
    display: flex;
    align-items: flex-start;
`;

const StyledSearchboxInput = styled.input`
    color: ${props => props.theme.colors.gray};
    font-size: 1.25rem;
    background: none;
    border: none;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: ${props => props.theme.colors.gray};
    }
`;

interface SearchProps {
    searchingState: boolean;
    setSearchingState: (newValue: boolean) => void;
} 

const Search = ({ searchingState, setSearchingState }: SearchProps) => {
    let [inputValue, setInputValue] = useState('');
    let [searchResults, setSearchResults] = useState<Task[]>([]);
    const tasks = useAppSelector(state => state.tasks.tasks);

    const onInputValueChange = (value: string) => {
        if (value.length === 0 && searchingState) 
            setSearchingState(false);
        else if (value.length > 0) {
            if (!searchingState)
                setSearchingState(true);
            updateSearchResults();
        }
        setInputValue(value);
    };

    const updateSearchResults = useCallback(() => {
        setSearchResults(tasks.filter(t => t.title.toLowerCase().includes(inputValue.toLowerCase())));
    }, [inputValue, tasks]);

    useEffect(updateSearchResults, [tasks, updateSearchResults]);

    return (
        <>
            <StyledSearchbox>
                <img alt='' src={SearchIcon} style={{ marginRight: '5px' }} />
                <StyledSearchboxInput 
                    placeholder='Search...'
                    value={inputValue}
                    onChange={(event) => onInputValueChange(event.target.value)} />
            </StyledSearchbox>
            {   
                searchingState && (searchResults.length > 0 
                ? <div style={{ alignSelf: 'center' }}>
                    {searchResults.map(t => <UserTask task={t} key={t.id} />)}
                </div>
                : "No results found.")
            }
        </>
    );
};

export default Search;