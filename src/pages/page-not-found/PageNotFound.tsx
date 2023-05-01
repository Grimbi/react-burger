import {FC} from "react";
import styles from './PageNotFound.module.css';

export const PageNotFound: FC = () => {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Page Not Found</h1>
            <h2 className={styles.message}>404</h2>
        </div>
    );
}
