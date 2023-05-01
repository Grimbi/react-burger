import {ChangeEvent, FormEvent, useEffect, useMemo, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserProfile, updateUserProfile} from "../../utils/Utils";
import {setUser} from "../../services/actions/User";
import {useAppDispatch} from "../../services/store";
import {IUserWithPassword} from "../../models/User";
import styles from "./ProfileEditor.module.css";

const initialFormData: IUserWithPassword = {
    name: "",
    email: "",
    password: "",
};

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

function ProfileEditor() {
    const dispatch = useAppDispatch();

    const [userProfile, setUserProfile] = useState<IUserWithPassword>();
    const [formData, setFormData] = useState<IUserWithPassword>(initialFormData);
    const [editMode, setEditMode] = useState(initialEditMode);

    useEffect(() => {
        getUserProfile()
            .then(profile => {
                const profileWithPassword: IUserWithPassword = {
                    ...profile,
                    password: "",
                };

                setUserProfile(profileWithPassword);
                setFormData({...profileWithPassword});
            })
            .catch(error => console.log(error));
    }, []);

    const isChanged = useMemo(() => {
        return userProfile
            && formData
            && (userProfile.name !== formData.name
                || userProfile.email !== formData.email
                || userProfile.password !== formData.password
            );
    }, [userProfile, formData]);

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
                setUserProfile({
                    ...formData,
                    ...updatedProfile,
                });
                setEditMode(initialEditMode);
                dispatch(setUser(updatedProfile));
            })
            .catch(error => console.log(error));
    };

    const toggleNameEditMode = () => {
        if (editMode.name) {
            setFormData({
                ...formData,
                name: userProfile?.name || "",
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
                email: userProfile?.email || "",
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
                password: userProfile?.password || "",
            });
        }

        setEditMode({
            ...editMode,
            password: !editMode.password,
        });
    }

    const cancel = () => {
        setFormData(userProfile ? userProfile : initialFormData);
        setEditMode(initialEditMode);
    };

    if (!userProfile) {
        return null;
    }

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

export default ProfileEditor;
