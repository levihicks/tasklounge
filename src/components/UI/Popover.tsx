import React from 'react';
import styled from 'styled-components';

const StyledPopover = styled.div`
    background: ${props => props.theme.colors.lightOrange};
    color: ${props => props.theme.colors.orange}; 
    box-shadow: 0px 0px 10px #00000029;
    padding: 10px;
`;

const Popover = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <StyledPopover className={className}>
            { children }
        </StyledPopover>
    );
};

export default Popover;

