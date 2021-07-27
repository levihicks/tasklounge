import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClock, 
    faCoffee, 
    faColumns, 
    faDoorOpen, 
    faBars 
} from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../../contexts/AuthContext';
import theme from '../../theme';
import AccountDropdown from '../AccountDropdown';

const StyledSidebarNav = styled.div<{menuActive: boolean}>`
    display: flex;
    flex-direction: column;
    min-width: 235px;
    max-width: 235px;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        min-width: 100%;
        background-color: ${props => props.theme.colors.orange};
        position: fixed;
        height: ${props => props.menuActive ? '100vh' : 'auto'};
        z-index: 2;
    }
`;

const StyledLogoAndTitle = styled.div`
    display: flex;
    align-items: center; 
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.navy};    
    margin-bottom: 25px;
    margin-left: 10px;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        padding: 0 20px;
        margin: 0;
    }
`;

const StyledIcon = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
`;

const HamburgerIcon = styled(StyledIcon)`
    cursor: pointer;
    margin-left: auto;
    display: none;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        display: inline-block;
    }
`;

const StyledSubtitle = styled.div`
    font-size: ${props => props.theme.fontSizes.extraSmall};

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        display: none;
    }
`;

const StyledLinkAndIcon = styled.div<{ menuActive: boolean }>`
    font-size: ${props => props.theme.fontSizes.medium};
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 5px 0;
    padding-left: 10px;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        ${props => !props.menuActive && 'display: none;'}
    }
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    font-weight: bold;
    margin-left: 10px;
    &:visited {
        color: ${props => props.theme.colors.navy};
    }
    &:hover {
        color: ${props => props.theme.colors.gray};
    }
    &.link-active {
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.navy};
        cursor: default;
        border-radius: 10px;
    }

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        margin: 0 5px;
    }
`;

const StyledAccountDropdown = styled(AccountDropdown)`
    color: white;
    padding: 0 10px;
    padding: 0 20px;
    margin-top: auto;
    margin-bottom: 25px;
`;

const SidebarNav = () => {
    const userSignedIn = useContext(AuthContext);
    const [menuActive, setMenuActive] = useState(false);

    return (
        <StyledSidebarNav menuActive={menuActive}>
            <StyledLogoAndTitle>
                <StyledIcon
                    style={{ 
                        minHeight: '60px', 
                        minWidth: '60px',
                        backgroundColor: theme.colors.orange }}>
                    <FontAwesomeIcon 
                        icon={faCoffee} 
                        color={theme.colors.navy} />
                </StyledIcon>
                <div>
                    TaskLounge
                    <StyledSubtitle>
                        The stress-free productivity dashboard.
                    </StyledSubtitle>
                </div>
                <HamburgerIcon 
                    onClick={() => setMenuActive(!menuActive)}>
                    <FontAwesomeIcon icon={faBars} />
                </HamburgerIcon>
            </StyledLogoAndTitle>
            <StyledLink 
                exact 
                activeClassName='link-active' 
                to={ROUTES.DASHBOARD}
                onClick={() => setMenuActive(false)}>
                <StyledLinkAndIcon menuActive={menuActive}>
                    <StyledIcon>
                        <FontAwesomeIcon icon={faColumns} color={theme.colors.red} /> 
                    </StyledIcon>
                    Dashboard
                </StyledLinkAndIcon>
            </StyledLink>
            <StyledLink 
                activeClassName='link-active' 
                to={ROUTES.TIMER}
                onClick={() => setMenuActive(false)}>
                <StyledLinkAndIcon
                    menuActive={menuActive}>
                    <StyledIcon>
                        <FontAwesomeIcon icon={faClock} color={theme.colors.red} />    
                    </StyledIcon>
                    Timer
                </StyledLinkAndIcon>
            </StyledLink>
            {
                userSignedIn === false &&
                (
                    <StyledLink 
                        activeClassName='link-active' 
                        to={ROUTES.SIGN_IN}
                        onClick={() => setMenuActive(false)}>
                        <StyledLinkAndIcon
                            menuActive={menuActive}>
                        <StyledIcon>
                            <FontAwesomeIcon icon={faDoorOpen} color={theme.colors.red} />    
                        </StyledIcon>
                            Sign In
                        </StyledLinkAndIcon>
                    </StyledLink>
                )
            }
            {menuActive && userSignedIn && <StyledAccountDropdown mobileView={true} />}
        </StyledSidebarNav>
    );
}

export default SidebarNav;