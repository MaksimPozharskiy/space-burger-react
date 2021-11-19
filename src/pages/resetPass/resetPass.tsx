import React, { FormEvent } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "../common.module.css"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { resetUserPassword } from "../../services/actions/authActions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../services/store";

function ResetPassPage(): JSX.Element | null {
  const location = useLocation();
  const history = useHistory();
  const { message, success } = useAppSelector((store: RootState) => ({
    message: store.authInfoUser.message,
    success: store.authInfoUser.success,
  }));
  const dispatch = useAppDispatch();
  const [code, setCode] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const isToken = localStorage.getItem("refreshToken");
  const onSubmit = (evt: FormEvent): void => {
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

  const changeCode = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(evt.target.value);
  };
  const changePassword = (evt: React.ChangeEvent<HTMLInputElement>): void => {
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
    <form className={styles.form_container} onSubmit={onSubmit} noValidate>
      <h2 className={styles.form_title}>Восстановление пароля</h2>
      <span className={styles.form_error}>{error}</span>
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
      <div className={styles.form_button}>
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </div>
      <p className={styles.form_paragraph}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}

export default ResetPassPage;