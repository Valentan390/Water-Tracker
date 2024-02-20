import s from "./WaterForm.module.css";

const WaterForm = ({ handleSubmit, errors, register, savewaterVolume }) => {
  return (
    <form className={s.valueWaterForm} onSubmit={handleSubmit}>
      <label className={s.valueWaterLabel}>
        Enter the value of the water used:
        <input
          className={`${s.valueWaterImput} ${
            errors.waterVolume ? s.valueWaterImputError : ""
          }`}
          type="number"
          placeholder="0"
          name="waterVolume"
          {...register("waterVolume")}
        />
        <p className={s.errorMessage}>{errors.waterVolume?.message}</p>
      </label>

      <div className={s.valueWaterSubmit}>
        <p className={s.valueWaterSubmitInfo}>{savewaterVolume}ml</p>
        <button className={s.valueWaterSubmitButton} type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default WaterForm;
