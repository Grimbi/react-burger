import PropTypes from 'prop-types';
import styles from "./HeaderLink.module.css";

function HeaderLink({type, extraClass, onClick, children}) {
    let className = type === "primary" ? styles.primary : styles.secondary;

    if (extraClass) {
        className = className + " " + extraClass;
    }

    return (
        <a className={className} onClick={onClick}>
            {children}
        </a>
    );
}

HeaderLink.propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    extraClass: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default HeaderLink;
