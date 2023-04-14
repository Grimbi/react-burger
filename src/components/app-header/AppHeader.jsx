import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderLink from "./HeaderLink";
import styles from './AppHeader.module.css';

function AppHeader() {
    const user = useSelector(store => store.user.user);

    const location = useLocation();

    const constructorType = location.pathname === "/" ? "primary" : "secondary";
    const orderFeedType = location.pathname === "/order-feed" ? "primary" : "secondary";
    const profileType = location.pathname === "/profile" || location.pathname === "/profile/orders" ? "primary" : "secondary";

    return (
        <header className={styles.overlay}>
            <div className={styles.header}>
                <nav className={`${styles.navigation} ${styles.first}`}>
                    <HeaderLink type={constructorType} to={"/"}>
                        <BurgerIcon type={constructorType}/>
                        Конструктор
                    </HeaderLink>
                    <HeaderLink type={orderFeedType} to={"/order-feed"}>
                        <ListIcon type={orderFeedType}/>
                        Лента заказов
                    </HeaderLink>
                </nav>
                <Logo/>
                <HeaderLink type={profileType} to={"/profile"} extraClass={styles.last}>
                    <ProfileIcon type={profileType}/>
                    {user?.name || "Личный кабинет"}
                </HeaderLink>
            </div>
        </header>
    );
}

export default AppHeader;
