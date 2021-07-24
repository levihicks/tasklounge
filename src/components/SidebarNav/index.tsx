import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCoffee, faColumns, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../../contexts/AuthContext';
import theme from '../../theme';

const StyledSidebarNav = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 235px;
    max-width: 235px;
`;

const StyledLogoAndTitle = styled.div`
    display: flex;
    align-items: center; 
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.navy};    
    margin-bottom: 25px;
    margin-left: 10px;
`;

const StyledIcon = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
`;

const StyledSubtitle = styled.div`
    font-size: ${props => props.theme.fontSizes.extraSmall};
`;

const StyledLinkAndIcon = styled.div`
    font-size: ${props => props.theme.fontSizes.medium};
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 5px 0;
    padding-left: 10px;
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
`;

const SidebarNav = () => {
    const userSignedIn = useContext(AuthContext);

    return (
        <StyledSidebarNav>
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
                <div>TaskLounge<StyledSubtitle>The stress-free productivity dashboard.</StyledSubtitle></div>
            </StyledLogoAndTitle>
            <StyledLink exact activeClassName='link-active' to={ROUTES.DASHBOARD}>
                <StyledLinkAndIcon>
                    <StyledIcon>
                        <FontAwesomeIcon icon={faColumns} color={theme.colors.red} /> 
                    </StyledIcon>
                    Dashboard
                </StyledLinkAndIcon>
            </StyledLink>
            <StyledLink activeClassName='link-active' to={ROUTES.TIMER}>
                <StyledLinkAndIcon>
                    <StyledIcon>
                        <FontAwesomeIcon icon={faClock} color={theme.colors.red} />    
                    </StyledIcon>
                    Timer
                </StyledLinkAndIcon>
            </StyledLink>
            {
                userSignedIn === false &&
                (
                    <StyledLink activeClassName='link-active' to={ROUTES.SIGN_IN}>
                        <StyledLinkAndIcon>
                        <StyledIcon>
                            <FontAwesomeIcon icon={faDoorOpen} color={theme.colors.red} />    
                        </StyledIcon>
                            Sign In
                        </StyledLinkAndIcon>
                    </StyledLink>
                )
            }
        </StyledSidebarNav>
    );
}

export default SidebarNav;