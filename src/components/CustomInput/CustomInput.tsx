import React from "react";
import styles from "./CustomInput.module.css";
import PropTypes from "prop-types";

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

function CustomInput(props) {
  const { placeholder, type, value, handleChange, isRequired, isCustom } = props;
  const [typeInput, setTypeInput] = React.useState(type);

  const onEyeClick = () => {
    if (typeInput === "password") {
      setTypeInput("show-password");
    } else {
      setTypeInput("password");
    }
  };

  const renderCustomInput = () => !isCustom ? (
    <>
      <label className={styles.input_label}>{value ? "" : placeholder}</label>
      <input
        type={typeInput}
        value={value || ""}
        onChange={handleChange}
        required={isRequired}
        className={styles.input}
      />
      {((typeInput === "password" && value) ||
        (typeInput === "show-password" && value)) && (
        <div className={styles.input_eye} onClick={onEyeClick}></div>
      )}
    </>
  ) : (
    <>
      <label className={styles.input_profile_label}>{placeholder}</label>
      <input
        type={typeInput}
        value={value || ""}
        onChange={handleChange}
        required={isRequired}
        className={`${styles.input} ${styles.input_profile}`}
      />

      {(typeInput === "password" && value) ||
      (typeInput === "show-password" && value) ? (
        <div className={styles.input_eye} onClick={onEyeClick}></div>
      ) : (
        <div className={styles.input_pencil}></div>
      )}
    </>
  );

  return <section className={styles.input_container}>{renderCustomInput()}</section>;
}

export default CustomInput;