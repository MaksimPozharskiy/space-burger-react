import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "../common.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { emailRegxep } from "../../utils/constants";
import { forgetUserPassword } from "../../services/actions";

function ForgetPassPage() {
  const location = useLocation();
  const { message, success } = useSelector((store: any) => ({
    message: store.authInfoUser.message,
    success: store.authInfoUser.success,
  }));
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const isMailValid = email ? email.match(emailRegxep) : "null";
  const isToken = localStorage.getItem("refreshToken");
  const onSubmit = (evt) => {
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

  const changeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  if (success && message === "Reset email") {
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