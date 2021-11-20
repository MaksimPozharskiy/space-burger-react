import React, { FormEvent } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "../common.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { emailRegxep } from "../../utils/constants";
import { forgetUserPassword } from "../../services/actions/authActions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";


function ForgetPassPage(): JSX.Element | null {
  const location = useLocation();
  const { message, success } = useAppSelector((store) => ({
    message: store.authInfoUser.message,
    success: store.authInfoUser.success,
  }));
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const isMailValid = email ? email.match(emailRegxep) : "null";
  const isToken = localStorage.getItem("refreshToken");
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!email) {
      setError("Поля Email должно быть заполнено");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (isMailValid === null) {
      setError("Неккоректный email адресс");
      setTimeout(() => setError(""), 3000);
      return;
    }
    dispatch(forgetUserPassword(email));
    setEmail("");
  };

  const changeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  if (success && message === "Reset email sent") {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
          state: { from: location },
        }}
      />
    );
  }

  if (isToken) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <form className={styles.form_container} onSubmit={onSubmit} noValidate>
      <h2 className={styles.form_title}>Восстановление пароля</h2>
      <span className={styles.form_error}>{error}</span>
      <CustomInput
        type="email"
        isRequired
        placeholder="Укажите e-mail"
        value={email}
        handleChange={changeEmail}
      />
      <div className={styles.form_button}>
        <Button type="primary" size="large">
          Восстановить
        </Button>
      </div>
      <p className={styles.form_paragraph}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}

export default ForgetPassPage;