import React, { useContext } from 'react';
import styled from 'styled-components';
import UserIcon from '../../assets/user.png';
import { signOutHandler } from '../../services/firebase';
import { AuthContext } from '../../contexts/AuthContext';

const StyledAccountDropdown = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.orange};
    font-weight: bold;
`;

const StyledUserIcon = styled.img`
    margin-right: 5px;
    height: 45px;
`;

const AccountDropdown = () => {
    const user = useContext(AuthContext);

    return (
        <StyledAccountDropdown onClick={signOutHandler}>
            <StyledUserIcon src={UserIcon} /> {user?.displayName} ▼
        </StyledAccountDropdown>
    );
};

export default AccountDropdown;