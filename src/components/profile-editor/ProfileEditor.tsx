import {ChangeEvent, FC, FormEvent, useMemo, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser} from "../../services/actions/User";
import {getUserSelector, useAppDispatch, useAppSelector} from "../../services/store";
import {IUserWithPassword} from "../../models/User";
import {updateUserProfile} from "../../utils/ServerApi";
import {logErrorDescription} from "../../utils/Utils";
import styles from "./ProfileEditor.module.css";

interface IEditMode {
    name: boolean;
    email: boolean;
    password: boolean;
}

const initialEditMode: IEditMode = {
    name: false,
    email: false,
    password: false,
};

export const ProfileEditor: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(getUserSelector);

    if (!user) {
        throw new Error("Invalid user state");
    }

    const [userPassword, setUserPassword] = useState("");
    const [formData, setFormData] = useState<IUserWithPassword>({
        ...user,
        password: "",
    });
    const [editMode, setEditMode] = useState(initialEditMode);

    const isChanged = useMemo(() => {
        return user.name !== formData.name
            || user.email !== formData.email
            || userPassword !== formData.password;
    }, [user, userPassword, formData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        updateUserProfile(formData)
            .then(updatedProfile => {
                setUserPassword(formData.password);
                setEditMode(initialEditMode);
                dispatch(setUser(updatedProfile));
            })
            .catch(error => logErrorDescription(error));
    };

    const toggleNameEditMode = () => {
        if (editMode.name) {
            setFormData({
                ...formData,
                name: user.name,
            });
        }

        setEditMode({
            ...editMode,
            name: !editMode.name,
        });
    }

    const toggleEmailEditMode = () => {
        if (editMode.email) {
            setFormData({
                ...formData,
                email: user.email || "",
            });
        }

        setEditMode({
            ...editMode,
            email: !editMode.email,
        });
    }

    const togglePasswordEditMode = () => {
        if (editMode.password) {
            setFormData({
                ...formData,
                password: userPassword,
            });
        }

        setEditMode({
            ...editMode,
            password: !editMode.password,
        });
    }

    const cancel = () => {
        setFormData({
            ...user,
            password: userPassword,
        });
        setEditMode(initialEditMode);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Имя"
                onChange={handleChange}
                icon={editMode.name ? "CloseIcon" : "EditIcon"}
                value={formData.name}
                name="name"
                error={false}
                onIconClick={toggleNameEditMode}
                size={'default'}
                disabled={!editMode.name}
            />
            <Input
                type="email"
                placeholder="Логин"
                onChange={handleChange}
                icon={editMode.email ? "CloseIcon" : "EditIcon"}
                value={formData.email}
                name="email"
                error={false}
                onIconClick={toggleEmailEditMode}
                size={'default'}
                disabled={!editMode.email}
            />
            <Input
                type="password"
                placeholder="Пароль"
                onChange={handleChange}
                icon={editMode.password ? "CloseIcon" : "EditIcon"}
                value={formData.password}
                name="password"
                error={false}
                onIconClick={togglePasswordEditMode}
                size={'default'}
                disabled={!editMode.password}
            />
            {isChanged && (
                <div className={styles.buttons}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={styles.button}
                        onClick={cancel}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass={styles.button}
                    >
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}
