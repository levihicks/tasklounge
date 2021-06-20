import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    box-shadow: 0px 0px 15px #00000029;
    width: 400px;
    padding: 25px;
    border-radius: 15px;
`;

const Card = ({ children, styleProps }: { children: React.ReactNode, styleProps?: {} }) => {
    return (
        <StyledCard style={styleProps}>
            {children}
        </StyledCard>
    );
};

export default Card;