import styles from "./HeaderLink.module.css";

function HeaderLink(props) {
    const {type, extraClass, onClick, children} = props;

    let className = type === "primary" ? styles.primary :styles.secondary;

    if (extraClass) {
        className = className + " " + extraClass;
    }

    return (
        <a className={className} onClick={onClick}>
            {children}
        </a>
    );
}

export default HeaderLink;
