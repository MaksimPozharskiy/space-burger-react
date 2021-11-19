import React, { FormEvent } from "react";
import styles from "./profile.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserInfo, getUserInfo } from "../../services/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../services/store";

function Profile(): JSX.Element | null {
  const { userName, userEmail } = useAppSelector((store: RootState) => ({
    userName: store.authInfoUser.user.name,
    userEmail: store.authInfoUser.user.email,
  }));
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const changeName = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setName(evt.target.value);
  };
  const changeEmail = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(evt.target.value);
  };
  const changePassword = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value);
  };

  const onSaveNewUserData = (evt: FormEvent): void => {
    evt.preventDefault();
    dispatch(updateUserInfo(name, email, password));
  };
  const handleCancel = (): void => {
    setName(userName);
    setEmail(userEmail); 
  };

  React.useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  React.useEffect(() => {
    setName(userName);
    setEmail(userEmail);
  }, [userName, userEmail]);

  return (
    <section className={styles.profile_container} onSubmit={onSaveNewUserData}>
      <ProfileMenu />
      <form className={styles.profile_data} noValidate>
        <CustomInput
          type="text"
          isRequired
          placeholder="Имя"
          value={name}
          handleChange={changeName}
          isCustom
        />
        <CustomInput
          type="email"
          isRequired
          placeholder="E-mail"
          value={email}
          handleChange={changeEmail}
          isCustom
        />
        <CustomInput
          type="password"
          isRequired
          placeholder="Пароль"
          value={password}
          handleChange={changePassword}
          isCustom
        />
        <div className={styles.profile_button_container}>
          <div className={styles.profile_button}>
            <Button type="primary" size="large">
              Сохранить
            </Button>
          </div>
          <div className={styles.profile_button} >
            <button className={styles.profile_button_reset} type="reset" onClick={handleCancel}>Отмена</button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Profile;