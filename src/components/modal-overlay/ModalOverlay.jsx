import styles from "./ModalOverlay.module.css";

function ModalOverlay({onClick, children}) {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}

export default ModalOverlay;
