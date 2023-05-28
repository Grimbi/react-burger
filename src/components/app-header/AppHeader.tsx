import {FC} from "react";
import {Link, useLocation} from "react-router-dom";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {HeaderLink} from "./HeaderLink";
import {getUserSelector, useAppSelector} from "../../services/store";
import styles from './AppHeader.module.css';

export const AppHeader: FC = () => {
    const {user} = useAppSelector(getUserSelector);

    const location = useLocation();

    const constructorType = location.pathname === "/" ? "primary" : "secondary";
    const orderFeedType = location.pathname === "/feed" ? "primary" : "secondary";
    const profileType = location.pathname === "/profile" || location.pathname === "/profile/orders" ? "primary" : "secondary";

    return (
        <header className={styles.overlay}>
            <div className={styles.header}>
                <nav className={`${styles.navigation} ${styles.first}`}>
                    <HeaderLink type={constructorType} to={"/"}>
                        <BurgerIcon type={constructorType}/>
                        Конструктор
                    </HeaderLink>
                    <HeaderLink type={orderFeedType} to={"/feed"}>
                        <ListIcon type={orderFeedType}/>
                        Лента заказов
                    </HeaderLink>
                </nav>
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <HeaderLink type={profileType} to={"/profile"} extraClass={styles.last}>
                    <ProfileIcon type={profileType}/>
                    {user?.name || "Личный кабинет"}
                </HeaderLink>
            </div>
        </header>
    );
}
