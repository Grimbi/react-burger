import {Link} from "react-router-dom";
import styles from "./NavigationLink.module.css";

function NavigationLink({label, link, to}) {
    return (
        <div className={styles.group}>
            <span className={styles.label}>{label}</span>
            <Link to={to} className={styles.link}>{link}</Link>
        </div>
    );
}

export default NavigationLink;
