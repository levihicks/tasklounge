import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    box-shadow: 0px 0px 15px #00000029;
    width: 400px;
    padding: 25px;
    border-radius: 15px;
`;

interface CardProps { 
    children: React.ReactNode;
    className?: string;
    mouseEnter?: () => void;
    mouseLeave?: () => void;
}

const Card = ({ children, className, mouseEnter, mouseLeave }: CardProps ) => {
    return (
        <StyledCard className={className} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            {children}
        </StyledCard>
    );
};

export default Card;