import s from "./TextInput.module.css";

const TextInput = ({ label, name, errors, register }) => {
  return (
    <label className={s.settingModalUserInfoLabel} htmlFor={name}>
      {label}
      <input
        className={`${s.settingModalUserInfoInput} ${
          errors[name] ? s.settingModalUserInfoInputError : ""
        }`}
        type="text"
        placeholder={label}
        name={name}
        {...register(name)}
      />
      <p className={s.errorMessage}>{errors[name]?.message}</p>
    </label>
  );
};

export default TextInput;
