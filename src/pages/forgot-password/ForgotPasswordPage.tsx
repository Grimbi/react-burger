import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import FieldsForm from "../../components/fields-form/FieldsForm";
import NavigationLink from "../../components/navigation-link/NavigationLink";
import {resetPassword} from "../../utils/Utils";
import {setIsWaitingReset} from "../../services/actions/User";
import {useAppDispatch} from "../../services/store";
import styles from "../login/LoginPage.module.css";

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");

    const handleSubmit = () => resetPassword(email)
        .then(() => {
            dispatch(setIsWaitingReset(true));
            navigate("/reset-password");
        })
        .catch(error => console.log(error));

    return (
        <>
            <FieldsForm
                title={"Восстановление пароля"}
                submitTitle={"Восстановить"}
                handleSubmit={handleSubmit}
            >
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
                    placeholder="Укажите e-mail"
                    extraClass={styles.input}
                />
            </FieldsForm>
            <div className={styles.navigationGroup}>
                <NavigationLink label="Вспомнили пароль?" link="Войти" to="/login"/>
            </div>
        </>
    );
}

export default ForgotPasswordPage;
