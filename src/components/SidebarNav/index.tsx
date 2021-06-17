import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const StyledSidebarNav = styled.div`
    display: flex;
    flex-direction: column;
`;

const SidebarNav = () => {
    return (
        <StyledSidebarNav>
            <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            <Link to={ROUTES.TIMER}>Timer</Link>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </StyledSidebarNav>
    );
}

export default SidebarNav;