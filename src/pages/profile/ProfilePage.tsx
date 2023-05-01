import React from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {logout} from "../../utils/Utils";
import {clear} from "../../services/actions/User";
import {getUserSelector, useAppDispatch} from "../../services/store";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {user} = useSelector(getUserSelector);

    if (!user) {
        return (<Navigate to={"/login"} state={{ previousPath: "/profile" }}/>);
    }

    const handleProfileClick = () => navigate("/profile");
    const handleOrderHistoryClick = () => navigate("/profile/orders");

    const handleExit = () => {
        logout()
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(clear());
            })
            .catch(error => console.log(error));
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

function NavigationLink({to, name, onClick}: INavigationLinkProps) {
    const location = useLocation();
    return location.pathname === to
        ? (<p className={styles.activeLink}>{name}</p>)
        : (<p className={styles.inactiveLink} onClick={onClick}>{name}</p>);
}

export default ProfilePage;
