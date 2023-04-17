import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./HeaderLink.module.css";
import {CHILDREN_PROP_TYPE} from "../../utils/AppPropTypes";

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
    children: CHILDREN_PROP_TYPE.isRequired,
};

export default HeaderLink;
