import React, {useEffect} from 'react';
import css from './Modal.module.css';
import { createPortal } from "react-dom";

interface NoteModalProps{
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: NoteModalProps) {
    
    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
    };
}, [onClose]);
    
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>{ children}</div>
        </div>,
        document.body
    );
}