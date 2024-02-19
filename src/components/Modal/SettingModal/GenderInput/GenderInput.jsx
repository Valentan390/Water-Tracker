import s from "./GenderInput.module.css";
import { Controller } from "react-hook-form";
import { genders } from "../SettingModalDate/SettingModalDate.js";

const GenderInput = ({ control }) => {
  return (
    <div className={s.settingModalYourGenderWrapper}>
      <h4 className={s.settingModalYourGenderTitle}>Your gender identity</h4>
      <div className={s.settingModalYourGenderInputWrapper}>
        {genders.map((gender) => (
          <label key={gender} className={s.settingModalYourGenderLabel}>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <input
                  type="radio"
                  {...field}
                  value={gender}
                  checked={field.value === gender}
                  className={s.radioInput}
                />
              )}
            />
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderInput;
