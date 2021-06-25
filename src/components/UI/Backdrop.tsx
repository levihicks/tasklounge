import React from 'react';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    opacity: .5;
    background: ${props => props.theme.colors.navy};
`;

const Backdrop = ({ hide }: { hide: () => void }) => {
    return (
        <StyledBackdrop onClick={hide} />
    );
};

export default Backdrop;