import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./HeaderLink.module.css";

function HeaderLink({type, to, extraClass, children}) {
    let className = type === "primary" ? styles.primary : styles.secondary;

    if (extraClass) {
        className = className + " " + extraClass;
    }

    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    );
}

HeaderLink.propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    to: PropTypes.string,
    extraClass: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default HeaderLink;
