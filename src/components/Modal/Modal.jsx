import { Component } from "react";
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

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component{
    componentDidMount() {
        window.addEventListener('keydown',this.handleKeyDown);    
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);    
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') this.props.handleCloseModal();
    }
        
    render() {
        const { src, alt } = this.props;

        return createPortal(
            <Overlay onClick={this.props.handleBackDropClick}>
                <ModalWindow>
                    <img src={src} alt={alt} />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
    }
}
