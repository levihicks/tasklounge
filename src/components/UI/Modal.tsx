import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Backdrop from './Backdrop';

const StyledModal = styled.div`
    min-height: 600px;
    max-height: 100vh;
    min-width: 600px;
    max-width: 100vw;
    overflow: auto;
    z-index: 100;
    background: ${props => props.theme.colors.white};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    border-radius: 10px;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        width: 90%;
        min-width: unset;
        min-height: 300px;
    }
`;

interface ModalProps {
    children: React.ReactNode;
    hide: () => void;
    className?: string;
    backdropStyle?: {[key: string]: any};
}

const Modal = ({ children, hide, className, backdropStyle }: ModalProps) => {
    return (
        <>
            {ReactDOM.createPortal(
                (
                    <>
                        <Backdrop styleProps={backdropStyle} hide={hide} />
                        <StyledModal className={className}>
                            {children}
                        </StyledModal>
                    </>
                ), document.getElementById('modal-root') as HTMLElement
            )}
        </>
    );
};

export default Modal;