import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import Backdrop from './Backdrop';

const popUp = keyframes`
    from {
        opacity: 0.3;
        transform: translate(-50%, -100%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

const StyledModal = styled.div`
    min-height: 600px;
    min-width: 600px;
    z-index: 100;
    background: ${props => props.theme.colors.white};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    border-radius: 10px;
    animation: ${popUp} 0.3s linear 1;
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