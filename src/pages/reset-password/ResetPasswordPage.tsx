import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FieldsForm} from "../../components/fields-form/FieldsForm";
import {NavigationLink} from "../../components/navigation-link/NavigationLink";
import {setIsWaitingReset} from "../../services/actions/User";
import {useAppDispatch} from "../../services/store";
import {finishResetPassword} from "../../utils/ServerApi";
import {logErrorDescription} from "../../utils/Utils";
import styles from "../login/LoginPage.module.css";

export const ResetPasswordPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [password, setPassword] = useState("");
    const [token, setCode] = useState("");

    const handleSubmit = () => {
        finishResetPassword(password, token)
            .then(() => {
                navigate("/login");
                dispatch(setIsWaitingReset(false));
            })
            .catch(error => logErrorDescription(error));
    };

    return (
        <>
            <FieldsForm
                title={"Восстановление пароля"}
                submitTitle={"Сохранить"}
                handleSubmit={handleSubmit}
            >
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    placeholder={"Введите новый пароль"}
                    value={password}
                    name={"password"}
                    extraClass={styles.input}
                />
                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    onChange={e => setCode(e.target.value)}
                    value={token}
                    name={"code"}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={styles.input}
                />
            </FieldsForm>
            <div className={styles.navigationGroup}>
                <NavigationLink label="Вспомнили пароль?" link="Войти" to="/login"/>
            </div>
        </>
    );
}
