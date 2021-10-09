import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./login.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { loginUser } from "../../services/actions";
import { emailRegxep } from "../../utils/constants";

function LoginPage() {
  const location = useLocation();
  const { success, userName } = useSelector((store: any) => ({
    success: store.authInfoUser.success,
    userName: store.authInfoUser.name,
  }));
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const isValidityMail = email ? email.match(emailRegxep) : "null";
  const isToken = localStorage.getItem("refreshToken");

  const onLogin = (evt) => {
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

  const changeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const changePassword = (evt) => {
    setPassword(evt.target.value);
  };

  if (isToken) {
    return (
      <Redirect to={location.state ? location.state.from.pathname : "/"} />
    );
  }

  return (
    <form className={styles.login_container} onSubmit={onLogin} noValidate>
      <h2 className={styles.login_title}>Вход</h2>
      <span className={styles.login_error}>{error}</span>
      <span className={styles.login_message}>
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
      <div className={styles.login_button}>
        <Button type="primary" size="large">
          Войти
        </Button>
      </div>
      <p className={styles.login_paragraph}>
        Вы &mdash; новый пользователь?{" "}
        <Link to="/registration">Зарегистрироваться</Link>
      </p>
      <p className={styles.login_paragraph}>
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </form>
  );
}

export default LoginPage;