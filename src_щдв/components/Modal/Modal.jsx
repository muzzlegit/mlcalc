import { createPortal } from "react-dom";
//STYLES
import { Backdrop, ModalBox } from "./Modal.styled";

export default function Modal({ level, toggleModal, children }) {
  const modalRoot = document.querySelector( `#modal-root-level-${ level }` )

  const onBackdropClick = ( e ) => {
    if( e.target.title === 'backdrop' ) toggleModal();
  }

  return createPortal(
    <Backdrop
      title = 'backdrop'
      onClick = { onBackdropClick }
    >
      <ModalBox>
        { children }
      </ModalBox>
    </Backdrop>, modalRoot
  )
}