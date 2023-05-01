import {MouseEvent, ReactNode, useEffect} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal");
const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

interface IModalProps {
    children: ReactNode;
    onClose: () => void;
}

function Modal({children, onClose}: IModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (modalRoot) {
        return ReactDOM.createPortal(
            (
                <ModalOverlay onClick={onClose}>
                    <div className={styles.modal} onClick={stopPropagation}>
                        <div className={styles.close}><CloseIcon type="primary" onClick={onClose}/></div>
                        {children}
                    </div>
                </ModalOverlay>
            ),
            modalRoot
        )
    }

    return (<></>);
}

export default Modal;
