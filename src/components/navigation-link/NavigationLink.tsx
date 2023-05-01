import {FC} from "react";
import {Link} from "react-router-dom";
import styles from "./NavigationLink.module.css";

interface INavigationLinkProps {
    label: string;
    link: string;
    to: string;
}

export const NavigationLink: FC<INavigationLinkProps> = ({label, link, to}) => {
    return (
        <div className={styles.group}>
            <span className={styles.label}>{label}</span>
            <Link to={to} className={styles.link}>{link}</Link>
        </div>
    );
}
