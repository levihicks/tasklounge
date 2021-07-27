import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { signOutHandler } from '../../services/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Popover from '../UI/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import theme from '../../theme';

const StyledAccountDropdown = styled.div<{ mobileView?: boolean }>`
    display: ${props => props.mobileView ? 'none' : 'flex'};
    align-items: center;
    color: ${props => props.theme.colors.orange};
    font-weight: bold;
    cursor: pointer;
    

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        display: ${props => props.mobileView ? 'flex' : 'none'};
        font-size: ${props => props.theme.fontSizes.medium};
    }
`;

const UserName = styled.div`
    margin-left: 5px;

    &:hover {
        opacity: 0.7;
    }
`;

const DropdownArrow = styled.div<{mobileView?: boolean}>`
    margin-left: 5px;
    font-size: ${props => props.theme.fontSizes.extraSmall};
    transition: transform .3s;
    &.open {
        transform: rotate(180deg);
    }

    ${props => props.mobileView && 'display: none;'}
`;

const SignOut = styled.div<{mobileView?: boolean}>`
    &:hover {
        opacity: 0.7;
    }

    margin-left: ${props => props.mobileView ? 'auto' : '0'};
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

const AccountDropdown = ({ className, mobileView }: { className?:string, mobileView?: boolean }) => {
    const user = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <StyledAccountDropdown 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            mobileView={mobileView}
            className={className}>
            <FontAwesomeIcon 
                icon={faUserCircle} 
                size={!mobileView ? '2x' : '1x'} 
                color={mobileView ? theme.colors.white : theme.colors.orange} />
            <UserName>{user && user?.displayName}</UserName> 
            <DropdownArrow 
                className={`${dropdownOpen && 'open'}`}
                mobileView={mobileView}>▼</DropdownArrow>
            {   
                dropdownOpen && !mobileView &&
                <StyledPopover>
                    <SignOut onClick={signOutHandler}>
                        Sign out
                    </SignOut>
                </StyledPopover>
            }
            {
                mobileView &&
                <SignOut 
                    mobileView={mobileView} 
                    onClick={signOutHandler}>
                    Sign out
                </SignOut>
            }
        </StyledAccountDropdown>
    );
};

export default AccountDropdown;