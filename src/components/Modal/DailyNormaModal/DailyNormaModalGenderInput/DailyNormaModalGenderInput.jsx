import s from "./DailyNormaModalGenderInput.module.css";

const DailyNormaModalGenderInput = ({ gender, setGender }) => {
  const genders = [
    { value: "woman", label: "For woman" },
    { value: "man", label: "For man" },
  ];
  return (
    <>
      <p className={s.dailyNormaModalFormaGenderTitle}>Calculate your rate:</p>
      <div className={s.dailyNormaModalGenderInputContainer}>
        {genders.map((option) => (
          <label
            key={option.value}
            className={s.dailyNormaModalGenderFormaLabel}
          >
            <input
              className={s.dailyNormaModalGenderFormaInput}
              type="radio"
              name="gender"
              value={option.value}
              checked={gender === option.value}
              onChange={(e) => setGender(e.target.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </>
  );
};

export default DailyNormaModalGenderInput;
