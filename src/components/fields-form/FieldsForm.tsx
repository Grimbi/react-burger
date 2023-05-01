import {FC, FormEvent, ReactNode} from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./FieldsForm.module.css";

interface IFieldsFormProps {
    title: string;
    submitTitle: string;
    handleSubmit: () => void;
    children: ReactNode;
}

export const FieldsForm: FC<IFieldsFormProps> = (
    {title, submitTitle, handleSubmit, children}
) => {
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2 className={styles.title}>{title}</h2>
            {children}
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass={styles.button}
            >
                {submitTitle}
            </Button>
        </form>
    );
}
