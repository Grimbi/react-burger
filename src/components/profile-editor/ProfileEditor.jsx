import {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserProfile, updateUserProfile} from "../../utils/Utils";
import styles from "./ProfileEditor.module.css";
import {setUser} from "../../services/actions/User";

const inputs = [
    {name: "name", placeholder: "Имя", type: "text"},
    {name: "email", placeholder: "Логин", type: "email"},
    {name: "password", placeholder: "Пароль", type: "password"}
];

function ProfileEditor() {
    const dispatch = useDispatch();

    const [userProfile, setUserProfile] = useState();
    const [formData, setFormData] = useState();
    const [editMode, setEditMode] = useState({});

    useEffect(() => {
        getUserProfile()
            .then(profile => {
                setUserProfile({
                    ...profile,
                    password: "",
                });

                const data = {};
                if (profile) {
                    inputs.forEach(input => data[input.name] = profile[input.name] || "");
                }
                setFormData(data);
            })
            .catch(error => console.log(error));
    }, []);

    const isChanged = useMemo(() => {
        return userProfile && formData && inputs.some(
            input => userProfile[input.name] !== formData[input.name]
        );
    }, [userProfile, formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData)
            .then(updatedProfile => {
                setUserProfile({
                    ...formData,
                    ...updatedProfile,
                });
                setEditMode({});
                dispatch(setUser(updatedProfile));
            })
            .catch(error => console.log(error));
    };

    const toggleEditMode = (name) => {
        const editing = editMode[name];
        if (editing) {
            setFormData({
               ...formData,
               [name]: userProfile[name],
            });
        }

        setEditMode({
            ...editMode,
            [name]: !editing,
        });
    };

    const cancel = () => {
        setFormData(userProfile);
        setEditMode({});
    };

    if (!userProfile) {
        return null;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
                <Input key={index}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    icon={editMode[input.name] ? "CloseIcon" : "EditIcon"}
                    value={formData[input.name]}
                    name={input.name}
                    error={false}
                    onIconClick={() => toggleEditMode(input.name)}
                    size={'default'}
                    disabled={!editMode[input.name]}
                />
            ))}
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
