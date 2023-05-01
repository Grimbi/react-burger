import {ReactNode} from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
    onClick: () => void;
    children: ReactNode
}

function ModalOverlay({onClick, children}: IModalOverlayProps) {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}

export default ModalOverlay;
