import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import FieldsForm from "../../components/fields-form/FieldsForm";
import NavigationLink from "../../components/navigation-link/NavigationLink";
import {finishResetPassword} from "../../utils/Utils";
import styles from "../login/LoginPage.module.css";

function ResetPasswordPage() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [token, setCode] = useState("");

    const handleSubmit = () => {
        finishResetPassword(password, token)
            .then(() => navigate("/login"))
            .catch(error => console.log(error));
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
                    error={false}
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

export default ResetPasswordPage;
