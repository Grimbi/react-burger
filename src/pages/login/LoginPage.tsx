import {useState} from "react";
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import FieldsForm from "../../components/fields-form/FieldsForm";
import NavigationLink from "../../components/navigation-link/NavigationLink";
import {userLogin} from "../../services/actions/User";
import {useAppDispatch} from "../../services/store";
import styles from "./LoginPage.module.css";

function LoginPage() {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => dispatch(userLogin({email, password}));

    return (
        <>
            <FieldsForm
                title={"Вход"}
                submitTitle={"Войти"}
                handleSubmit={handleSubmit}
            >
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
                    placeholder="E-mail"
                    extraClass={styles.input}
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={"password"}
                    extraClass={styles.input}
                />
            </FieldsForm>
            <div className={styles.navigationGroup}>
                <NavigationLink label="Вы — новый пользователь?" link="Зарегистрироваться" to="/register"/>
                <NavigationLink label="Забыли пароль?" link="Восстановить пароль" to="/forgot-password"/>
            </div>
        </>
    );
}

export default LoginPage;
