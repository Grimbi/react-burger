import React from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import styles from "./ProfilePage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../utils/Utils";
import {clear} from "../../services/actions/User";

function ProfilePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(store => store.user.user);

    if (!userData) {
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

function NavigationLink({to, name, onClick}) {
    const location = useLocation();
    return location.pathname === to
        ? (<p className={styles.activeLink}>{name}</p>)
        : (<p className={styles.inactiveLink} onClick={onClick}>{name}</p>);
}

export default ProfilePage;
