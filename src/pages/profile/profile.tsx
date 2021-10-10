import React from "react";
import styles from "./Profile.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, updateUserInfo } from "../../services/actions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const { userName, userEmail } = useSelector((store: any) => ({
    userName: store.authInfoUser.user.name,
    userEmail: store.authInfoUser.user.email,
  }));
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const changeName = (evt) => {
    setName(evt.target.value);
  };
  const changeEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const changePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const onSaveNewUserData = (evt) => {
    evt.preventDefault();
    dispatch(updateUserInfo(name, email, password));
  };
  const handleCancel = () => {
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
          <div className={styles.profile_button} onClick={handleCancel}>
            <Button type="primary" size="large">
              Отмена
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Profile;