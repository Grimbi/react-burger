import {ChangeEvent, FC, useCallback, useState} from "react";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FieldsForm} from "../../components/fields-form/FieldsForm";
import {NavigationLink} from "../../components/navigation-link/NavigationLink";
import {userRegister} from "../../services/actions/User";
import {IUserWithPassword} from "../../models/User";
import {useAppDispatch} from "../../services/store";
import styles from "../login/LoginPage.module.css";

const userInitialState: IUserWithPassword = {
    name: "",
    email: "",
    password: "",
}

export const RegisterPage: FC = () => {
    const [user, setUser] = useState(userInitialState);

    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUser({
        ...user,
        [e.target.name]: e.target.value,
    });

    const handleSubmit = useCallback(
        () => {
            dispatch(userRegister(user));
        },
        [user, dispatch]
    );

    return (
        <>
            <FieldsForm
                title={"Регистрация"}
                submitTitle={"Зарегистрироваться"}
                handleSubmit={handleSubmit}
            >
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={handleChange}
                    value={user.name}
                    name={"name"}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass={styles.input}
                />
                <EmailInput
                    onChange={handleChange}
                    value={user.email}
                    name={"email"}
                    placeholder="E-mail"
                    extraClass={styles.input}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={user.password}
                    name={"password"}
                    extraClass={styles.input}
                />
            </FieldsForm>
            <div className={styles.navigationGroup}>
                <NavigationLink label="Уже зарегистрированы?" link="Войти" to="/login"/>
            </div>
        </>
    );
}
