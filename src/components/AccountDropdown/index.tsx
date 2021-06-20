import React from 'react';
import styled from 'styled-components';
import UserIcon from '../../assets/user.png';

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
    return (
        <StyledAccountDropdown>
            <StyledUserIcon src={UserIcon} /> Alan ▼
        </StyledAccountDropdown>
    );
};

export default AccountDropdown;