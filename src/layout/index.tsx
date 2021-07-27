import React from 'react';
import styled from 'styled-components';
import SidebarNav from '../components/SidebarNav';

const StyledLayout = styled.div`
    margin: 0 auto;
    height: 100vh;
    padding-top: 20px;
    max-width: 1368px;
    display: flex;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        padding-top: 0px;
    }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledLayout>
            <SidebarNav />
            {children}
        </StyledLayout>
    );
};

export default Layout;