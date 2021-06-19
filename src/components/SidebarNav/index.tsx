import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Logo from '../../assets/taskhub.png';
import DashboardLogo from '../../assets/dashboard.png';
import TimerLogo from '../../assets/timer.png';
import SignInLogo from '../../assets/sign-in.png';

const StyledSidebarNav = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledLogoAndTitle = styled.div`
    display: flex; 
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.red};
    margin-bottom: 25px;
    padding-left: 10px;
`;

const StyledIcon = styled.img`
    height: 40px;
    width: 40px;
    margin-right: 5px;
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
    return (
        <StyledSidebarNav>
            <StyledLogoAndTitle>
                <StyledIcon src={Logo} />
                <div>TaskLounge<StyledSubtitle>The stress-free productivity dashboard.</StyledSubtitle></div>
            </StyledLogoAndTitle>
            <StyledLink exact activeClassName="link-active" to={ROUTES.DASHBOARD}>
                <StyledLinkAndIcon>
                    <StyledIcon src={DashboardLogo} />
                    Dashboard
                </StyledLinkAndIcon>
            </StyledLink>
            <StyledLink activeClassName="link-active" to={ROUTES.TIMER}>
                <StyledLinkAndIcon>
                    <StyledIcon src={TimerLogo} />
                    Timer
                </StyledLinkAndIcon>
            </StyledLink>
            <StyledLink activeClassName="link-active" to={ROUTES.SIGN_IN}>
                <StyledLinkAndIcon>
                    <StyledIcon src={SignInLogo} />
                    Sign In
                </StyledLinkAndIcon>
            </StyledLink>

        </StyledSidebarNav>
    );
}

export default SidebarNav;