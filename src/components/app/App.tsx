import {FC, useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {AppHeader} from "../app-header/AppHeader";
import {MainPage} from "../../pages/main/MainPage";
import {LoginPage} from "../../pages/login/LoginPage";
import {RegisterPage} from "../../pages/register/RegisterPage";
import {ForgotPasswordPage} from "../../pages/forgot-password/ForgotPasswordPage";
import {ResetPasswordPage} from "../../pages/reset-password/ResetPasswordPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {FeedPage} from "../../pages/feed/FeedPage";
import {ProfileEditor} from "../profile-editor/ProfileEditor";
import {Orders} from "../orders/Orders";
import {PageNotFound} from "../../pages/page-not-found/PageNotFound";
import {IngredientDetails} from "../ingredient-details/IngredientDetails";
import {Modal} from "../modal/Modal";
import {fetchIngredients} from "../../services/actions/Ingredients";
import {setIsAuthChecked, setUser} from "../../services/actions/User";
import {ProtectedRouteElement} from "../protected-route-element/ProtectedRouteElement";
import {getUserSelector, useAppDispatch, useAppSelector} from "../../services/store";
import {getUserProfile} from "../../utils/ServerApi";
import {logErrorDescription} from "../../utils/Utils";
import styles from './App.module.css';
import {OrderInfo} from "../order-info/OrderInfo";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const background = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());

        if (localStorage.getItem("accessToken")) {
            getUserProfile()
                .then(user => dispatch(setUser(user)))
                .catch(error => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    logErrorDescription(error);
                    dispatch(setIsAuthChecked(true));
                });
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }, [dispatch]);

    const {isWaitingReset} = useAppSelector(getUserSelector);

    const handleModalClose = () => navigate(-1);

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={
                    <ProtectedRouteElement onlyUnAuth={true}>
                        <LoginPage/>
                    </ProtectedRouteElement>
                }/>
                <Route path="/register" element={
                    <ProtectedRouteElement onlyUnAuth={true}>
                        <RegisterPage/>
                    </ProtectedRouteElement>
                }/>
                <Route path="/forgot-password" element={
                    <ProtectedRouteElement onlyUnAuth={true}>
                        <ForgotPasswordPage/>
                    </ProtectedRouteElement>
                }/>
                {isWaitingReset && (
                    <Route path="/reset-password" element={
                        <ProtectedRouteElement onlyUnAuth={true}>
                            <ResetPasswordPage/>
                        </ProtectedRouteElement>
                    }/>
                )}
                <Route path="/profile" element={
                    <ProtectedRouteElement>
                        <ProfilePage/>
                    </ProtectedRouteElement>
                }>
                    <Route index element={<ProfileEditor/>}/>
                    <Route path="orders" element={<Orders/>}/>
                </Route>
                <Route path="/profile/orders/:id" element={<OrderInfo/>}/>
                <Route path="/feed" element={<FeedPage/>}/>
                <Route path="/feed/:id" element={<OrderInfo/>}/>
                <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal onClose={handleModalClose}>
                            <IngredientDetails modal/>
                        </Modal>
                    }/>
                    <Route path="/feed/:id" element={
                        <Modal onClose={handleModalClose}>
                            <OrderInfo modal/>
                        </Modal>
                    }/>
                    <Route path="/profile/orders/:id" element={
                        <Modal onClose={handleModalClose}>
                            <OrderInfo modal/>
                        </Modal>
                    }/>
                </Routes>
            )}
        </div>
    );
}
