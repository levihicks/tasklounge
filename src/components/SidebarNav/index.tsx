import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    margin-left: 20px;
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
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    &:visited {
        color: ${props => props.theme.colors.navy};
    }
    &:hover {
        color: ${props => props.theme.colors.gray};
    }
`;

const SidebarNav = () => {
    return (
        <StyledSidebarNav>
            <StyledLogoAndTitle>
                <StyledIcon src={Logo} />
                <div>TaskLounge<StyledSubtitle>The stress-free productivity dashboard.</StyledSubtitle></div>
            </StyledLogoAndTitle>
            <StyledLinkAndIcon>
                <StyledIcon src={DashboardLogo} />
                <StyledLink to={ROUTES.DASHBOARD}>Dashboard</StyledLink>
            </StyledLinkAndIcon>
            <StyledLinkAndIcon>
                <StyledIcon src={TimerLogo} />
                <StyledLink to={ROUTES.TIMER}>Timer</StyledLink>
            </StyledLinkAndIcon>
            <StyledLinkAndIcon>
                <StyledIcon src={SignInLogo} />
                <StyledLink to={ROUTES.SIGN_IN}>Sign In</StyledLink>
            </StyledLinkAndIcon>
        </StyledSidebarNav>
    );
}

export default SidebarNav;