import React, { useContext, useState } from 'react';
import styled from 'styled-components';
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
    &:hover {
        color: ${props => props.theme.colors.blue};
    }
`;

const StyledUserIcon = styled.img`
    margin-right: 5px;
    height: 45px;
`;

const DropdownArrow = styled.div`
    margin-left: 5px;
    font-size: ${props => props.theme.fontSizes.extraSmall};
    &.open {
        transform: rotate(180deg);
    }
`;

const SignOut = styled.div`
    &:hover {
        color: ${props => props.theme.colors.white};
    }
`;

const StyledPopover = styled(Popover)`
    width: 150px;
    position: absolute;
    transform: translateY(45px);
`;

const AccountDropdown = () => {
    const user = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <StyledAccountDropdown onClick={() => setDropdownOpen(!dropdownOpen)}>
            <StyledUserIcon src={UserIcon} /> {user && user?.displayName} 
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