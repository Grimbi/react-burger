import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./FieldsForm.module.css";

function FieldsForm({title, submitTitle, handleSubmit, children}) {
    const submitHandler = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <form className={styles.form}>
            <h2 className={styles.title}>{title}</h2>
            {children}
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass={styles.button}
                onClick={submitHandler}
            >
                {submitTitle}
            </Button>
        </form>
    );
}

export default FieldsForm;
