import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "../common.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { createUser } from "../../services/actions";
import { emailRegxep } from "../../utils/constants";

function RegisterPage() {
  const dispatch = useDispatch();
  const { success } = useSelector((store: any) => ({
    success: store.authInfoUser.success,
  }));
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const isValidityMail = email ? email.match(emailRegxep) : "null";
  const isToken = localStorage.getItem("refreshToken");

  const onRegister = (evt) => {
    evt.preventDefault();
    if (!email || !password || !name) {
      setError("Все поля должны быть заполнены!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (isValidityMail === null) {
      setError("Неккоректный адрес почты");
      setTimeout(() => setError(""), 3000);
      return;
    }
    dispatch(createUser({ name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };

  const changeName = (evt) => {
    setName(evt.target.value);
  };

  const changeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const changePassword = (evt) => {
    setPassword(evt.target.value);
  };

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
    <form className={styles.form_container} onSubmit={onRegister} noValidate>
      <h2 className={styles.form_title}>Регистрация</h2>
      <span className={styles.form_error}>{error}</span>
      <span className={styles.form_message}>
        {success ? "Выбранная почта уже зарегистрирована" : ""}
      </span>

      <CustomInput
        type="text"
        isRequired
        placeholder="Имя"
        value={name}
        handleChange={changeName}
      />
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
          {" "}
          Зарегистрироваться{" "}
        </Button>
      </div>
      <p className={styles.form_paragraph}>
        Уже зарегестрированы? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}

export default RegisterPage;