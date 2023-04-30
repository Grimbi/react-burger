import {Link} from "react-router-dom";
import styles from "./NavigationLink.module.css";

interface INavigationLinkProps {
    label: string;
    link: string;
    to: string;
}

function NavigationLink({label, link, to}: INavigationLinkProps) {
    return (
        <div className={styles.group}>
            <span className={styles.label}>{label}</span>
            <Link to={to} className={styles.link}>{link}</Link>
        </div>
    );
}

export default NavigationLink;
