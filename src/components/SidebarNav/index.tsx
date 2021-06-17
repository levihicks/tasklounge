import React from 'react';
import styled from 'styled-components';

const StyledSidebarNav = styled.div`
    color: ${props => props.theme.colors.red};
`;

const SidebarNav = () => {
    return <StyledSidebarNav>This is a sidebar.</StyledSidebarNav>;
}

export default SidebarNav;