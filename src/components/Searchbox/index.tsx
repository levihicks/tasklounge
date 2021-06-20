import React from "react";
import styled from 'styled-components';
import SearchIcon from '../../assets/search.png';

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

const Searchbox = () => {
    return (
        <StyledSearchbox>
                <img alt='' src={SearchIcon} style={{ marginRight: '5px' }} />
                <StyledSearchboxInput placeholder="Search..." />
        </StyledSearchbox>
    );
};

export default Searchbox;