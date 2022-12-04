import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalWindow = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;



export function Modal({ handleMyCloseModal, handleBackDropClick, src, alt }) {
    const modalRoot = document.querySelector("#modal-root");
    const handleKeyDown = useRef();

    handleKeyDown.current = e => {
        if (e.code === 'Escape') handleMyCloseModal();
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown.current);
        return () => {
            window.removeEventListener('keydown', handleKeyDown.current); 
        }
    }, []);
        return createPortal(
            <Overlay onClick={handleBackDropClick}>
                <ModalWindow>
                    <img src={src} alt={alt} />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
}
