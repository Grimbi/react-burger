import {FC, PropsWithChildren} from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
    onClick: () => void;
}

export const ModalOverlay: FC<PropsWithChildren<IModalOverlayProps>> = ({onClick, children}) => {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}
