import {FC, ReactNode} from "react";
import {Link} from "react-router-dom";
import styles from "./HeaderLink.module.css";

interface IHeaderLinkProps {
    type: string;
    to: string;
    extraClass?: string;
    children: ReactNode;
}

export const HeaderLink: FC<IHeaderLinkProps> = (
    {type, to, extraClass, children}
) => {
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
