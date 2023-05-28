import React, {FC} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {clear} from "../../services/actions/User";
import {getUserSelector, useAppDispatch, useAppSelector} from "../../services/store";
import {logout} from "../../utils/ServerApi";
import {logErrorDescription} from "../../utils/Utils";
import styles from "./ProfilePage.module.css";

export const ProfilePage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(getUserSelector);

    if (!user) {
        return (<Navigate to={"/login"} state={{ previousPath: "/profile" }}/>);
    }

    const handleProfileClick = () => navigate("/profile");
    const handleOrderHistoryClick = () => navigate("/profile/orders");

    const handleExit = () => {
        logout()
            .then(() => dispatch(clear()))
            .catch(error => logErrorDescription(error));
    };

    return (
        <div className={styles.page}>
            <nav>
                <NavigationLink to={"/profile"} name={"Профиль"} onClick={handleProfileClick}/>
                <NavigationLink to={"/profile/orders"} name={"История заказов"} onClick={handleOrderHistoryClick}/>
                <p className={styles.inactiveLink} onClick={handleExit}>Выход</p>
                <p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <Outlet/>
        </div>
    );
}

interface INavigationLinkProps {
    to: string;
    name: string;
    onClick: () => void;
}

const NavigationLink: FC<INavigationLinkProps> = ({to, name, onClick}) => {
    const location = useLocation();
    return location.pathname === to
        ? (<p className={styles.activeLink}>{name}</p>)
        : (<p className={styles.inactiveLink} onClick={onClick}>{name}</p>);
}
