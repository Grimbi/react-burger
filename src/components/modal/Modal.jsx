import {useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import styles from "./Modal.module.css";
import {CHILDREN_PROP_TYPE} from "../../utils/AppPropTypes";

const modalRoot = document.getElementById("modal");
const stopPropagation = (event) => event.stopPropagation();

function Modal({ children, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

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
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: CHILDREN_PROP_TYPE.isRequired,
};

export default Modal;
