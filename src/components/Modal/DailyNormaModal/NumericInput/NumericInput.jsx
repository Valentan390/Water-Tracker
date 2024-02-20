import s from "../DailyNormaModal.module.css";

const NumericInput = ({ label, value, setValue, ...inputProps }) => {
  return (
    <label className={s.dailyNormaModalFormaLabel}>
      {label}:
      <input
        className={s.dailyNormaModalFormaInput}
        type="number"
        step="0.1"
        {...inputProps}
        value={value}
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);

          if (!isNaN(inputValue)) {
            setValue(inputValue);
          }
        }}
      />
    </label>
  );
};

export default NumericInput;
