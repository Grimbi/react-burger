import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './AppHeader.module.css';
import HeaderLink from "./HeaderLink";

function AppHeader() {
    return (
        <header className={styles.overlay}>
            <div className={styles.header}>
                <nav className={`${styles.navigation} ${styles.first}`}>
                    <HeaderLink type="primary">
                        <BurgerIcon type="primary"/>
                        Конструктор
                    </HeaderLink>
                    <HeaderLink type="secondary">
                        <ListIcon type="secondary"/>
                        Лента заказов
                    </HeaderLink>
                </nav>
                <Logo/>
                <HeaderLink type="secondary" extraClass={styles.last}>
                    <ProfileIcon type="secondary"/>
                    Личный кабинет
                </HeaderLink>
            </div>
        </header>
    );
}

export default AppHeader;
