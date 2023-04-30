import {Link} from "react-router-dom";
import styles from "./HeaderLink.module.css";
import {ReactNode} from "react";

interface IHeaderLinkProps {
    type: string;
    to: string;
    extraClass?: string;
    children: ReactNode;
}

function HeaderLink({type, to, extraClass, children}: IHeaderLinkProps) {
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

export default HeaderLink;
