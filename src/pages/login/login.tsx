import React, { FormEvent } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "../common.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { emailRegxep } from "../../utils/constants";
import { loginUser } from "../../services/actions/authActions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function LoginPage(): JSX.Element | null {
  const location = useLocation();
  const { success, userName } = useAppSelector((store: any) => ({
    success: store.authInfoUser.success,
    userName: store.authInfoUser.name,
  }));
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const isValidityMail = email ? email.match(emailRegxep) : "null";
  const isToken = localStorage.getItem("refreshToken");

  const onLogin = (evt: FormEvent): void => {
    evt.preventDefault();
    if (!email || !password) {
      setError("Поля не заполненны!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (isValidityMail === null) {
      setError("Неккоректный адрес почты");
      setTimeout(() => setError(""), 3000);
      return; 
    }
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
  };

  const changeEmail = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(evt.target.value);
  };

  const changePassword = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value);
  };

  if (isToken) {
    return (
      <Redirect to={location.state ? location.state.from.pathname : "/"} />
    );
  }

  return (
    <form className={styles.form_container} onSubmit={onLogin} noValidate>
      <h2 className={styles.form_title}>Вход</h2>
      <span className={styles.form_error}>{error}</span>
      <span className={styles.form_message}>
        {success && userName ? `Вход выполнен` : ""}
      </span>
      <CustomInput
        type="email"
        isRequired
        placeholder="E-mail"
        value={email}
        handleChange={changeEmail}
      />
      <CustomInput
        type="password"
        isRequired
        placeholder="Пароль"
        value={password}
        handleChange={changePassword}
      />
      <div className={styles.form_button}>
        <Button type="primary" size="large">
          Войти
        </Button>
      </div>
      <p className={styles.form_paragraph}>
        Вы &mdash; новый пользователь?{" "}
        <Link to="/registration">Зарегистрироваться</Link>
      </p>
      <p className={styles.form_paragraph}>
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </form>
  );
}

export default LoginPage;