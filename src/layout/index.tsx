import React from 'react';
import styled from 'styled-components';
import SidebarNav from '../components/SidebarNav';

const StyledLayout = styled.div`
    margin: 0 auto;
    max-width: 1368px;
    height: 100vh;
    display: flex;
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