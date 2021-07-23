import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import UserIcon from '../../assets/user.png';
import { signOutHandler } from '../../services/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Popover from '../UI/Popover';

const StyledAccountDropdown = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.orange};
    font-weight: bold;
    cursor: pointer;
`;

const StyledUserIcon = styled.img`
    margin-right: 5px;
    height: 45px;
`;

const UserName = styled.div`
    &:hover {
        opacity: 0.7;
    }
`;

const DropdownArrow = styled.div`
    margin-left: 5px;
    font-size: ${props => props.theme.fontSizes.extraSmall};
    transition: transform .3s;
    &.open {
        transform: rotate(180deg);
    }
`;

const SignOut = styled.div`
    &:hover {
        opacity: 0.7;
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0px);
        opacity: 0;
    }
    to {
        transform: translateY(45px);
        opacity: 1;
    }
`;

const StyledPopover = styled(Popover)`
    width: 150px;
    position: absolute;
    transform: translateY(45px);
    animation: ${slideDown} 0.3s linear 1;
`;

const AccountDropdown = () => {
    const user = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <StyledAccountDropdown onClick={() => setDropdownOpen(!dropdownOpen)}>
            <StyledUserIcon src={UserIcon} /> 
            <UserName>{user && user?.displayName}</UserName> 
            <DropdownArrow className={`${dropdownOpen && 'open'}`}>▼</DropdownArrow>
            {   
                dropdownOpen &&
                <StyledPopover>
                    <SignOut onClick={signOutHandler}>
                        Sign out
                    </SignOut>
                </StyledPopover>
            }
        </StyledAccountDropdown>
    );
};

export default AccountDropdown;