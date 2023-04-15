import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NavigationLink.module.css";

function NavigationLink({label, link, to}) {
    return (
        <div className={styles.group}>
            <span className={styles.label}>{label}</span>
            <Link to={to} className={styles.link}>{link}</Link>
        </div>
    );
}

NavigationLink.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default NavigationLink;
