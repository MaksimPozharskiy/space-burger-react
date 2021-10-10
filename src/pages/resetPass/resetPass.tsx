import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./resetPass.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUserPassword } from "../../services/actions";

function ResetPassPage() {
  const location = useLocation();
  const history = useHistory();
  const { message, success } = useSelector((store: any) => ({
    message: store.authInfoUser.message,
    success: store.authInfoUser.success,
  }));
  const dispatch = useDispatch();
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const isToken = localStorage.getItem("refreshToken");
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!code || !password) {
      setError("Необходимые поля не заполнены");
      setTimeout(() => setError(""), 3000);
      return;
    }
    dispatch(resetUserPassword(password, code));
    setPassword("");
    setCode("");
  };

  const changeCode = (evt) => {
    setCode(evt.target.value);
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
  if (success && message === "Password successfully reset") {
    history.push("/login");
  }

  if (!location.state) {
    history.push("/");
  }

  return (
    <form className={styles.login_container} onSubmit={onSubmit} noValidate>
      <h2 className={styles.login_title}>Восстановление пароля</h2>
      <span className={styles.login_error}>{error}</span>
      <CustomInput
        type="password"
        isRequired
        placeholder="Введите новый пароль"
        value={password}
        handleChange={changePassword}
      />
      <CustomInput
        type="text"
        isRequired
        placeholder="Введите код из письма"
        value={code}
        handleChange={changeCode}
      />
      <div className={styles.login_button}>
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </div>
      <p className={styles.login_paragraph}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}

export default ResetPassPage;