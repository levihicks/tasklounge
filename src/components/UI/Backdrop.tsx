import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 0.5;
    }
`;

const StyledBackdrop = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    opacity: .5;
    background: ${props => props.theme.colors.navy};
    z-index: 99;
    animation: ${fadeIn} 0.3s linear 1;
`;

const Backdrop = ({ hide, styleProps }: { hide: () => void, styleProps: {[key: string]: any} | undefined }) => {
    return (
        <StyledBackdrop style={styleProps} onClick={hide} />
    );
};

export default Backdrop;