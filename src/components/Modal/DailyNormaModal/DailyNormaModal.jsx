import s from "./DailyNormaModal.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { useAuth } from "../../../hooks/userAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  calculateWaterNorma,
  updateDailyNormaUsrSchema,
} from "../../../helpers/validation";
import { updatDailiNormaUser } from "../../../redux/authUser/operations";

const DailyNormaModal = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [waterNormaUser, setWaterNormaUser] = useState("");
  const [weight, setWeight] = useState("");
  const [sportsTime, setSportsTime] = useState("");
  const [gender, setGender] = useState(user?.gender || "");

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(updateDailyNormaUsrSchema),
  });

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

  const onSubmit = ({ dailyNorma }) => {
    console.log({ dailyNorma: dailyNorma * 1000 });
    dispatch(updatDailiNormaUser({ dailyNorma: dailyNorma * 1000 }));
    handleCloseModal();
    // console.log(data);
  };

  useEffect(() => {
    const waterNorma = calculateWaterNorma(gender, weight, sportsTime);

    if (waterNorma !== undefined) {
      setWaterNormaUser(waterNorma);
      setValue("dailyNorma", waterNorma);
      setValue("gender", gender);
    }
  }, [gender, weight, sportsTime, setValue]);

  return (
    <div className={s.dailyNormaModalWrapper}>
      <div className={s.dailyNormaModalContainerDailyNorma}>
        <h4 className={s.dailyNormaModalTitle}>My daily norma</h4>
        <button type="button" onClick={handleCloseModal}>
          <svg className={s.dailyNormaModalContainerDailyNormaSvg}>
            <use href={`${sprite}#icon-outline`} />
          </svg>
        </button>
      </div>

      <div className={s.dailyNormaModalContainerGender}>
        <p className={s.dailyNormaModalGender}>
          For girl:{" "}
          <span className={s.dailyNormaModalGenderFormula}>
            V=(M*0,03) + (T*0,4)
          </span>
        </p>
        <p className={s.dailyNormaModalGender}>
          For man:{" "}
          <span className={s.dailyNormaModalGenderFormula}>
            V=(M*0,04) + (T*0,6)
          </span>
        </p>
        <p className={s.dailyNormaModalGenderDescription}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports, or another type of activity
          commensurate in terms of loads (in the absence of these, you must set
          0)
        </p>
      </div>

      <form
        className={s.dailyNormaModalForma}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={s.dailyNormaModalContainerFormaGender}>
          <p className={s.dailyNormaModalFormaGenderTitle}>
            Calculate your rate:
          </p>
          <div className={s.dailyNormaModalGenderInputContainer}>
            <label className={s.dailyNormaModalGenderFormaLabel}>
              <input
                type="radio"
                name="gender"
                value="woman"
                checked={gender === "woman"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              For woman
            </label>

            <label className={s.dailyNormaModalGenderFormaLabel}>
              <input
                type="radio"
                name="gender"
                value="man"
                checked={gender === "man"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              For man
            </label>
          </div>
          <label className={s.dailyNormaModalFormaLabel}>
            Your weight in kilograms:
            <input
              className={s.dailyNormaModalFormaInput}
              type="number"
              step="0.1"
              min="1"
              placeholder="0"
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value);

                if (!isNaN(inputValue) && inputValue > 0) {
                  setWeight(inputValue);
                }
              }}
            />
          </label>
          <label className={s.dailyNormaModalFormaLabel}>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
            <input
              className={s.dailyNormaModalFormaInput}
              type="number"
              step="0.1"
              min="0"
              placeholder="0"
              onChange={(e) => {
                setSportsTime(e.target.value);
                const inputValue = parseFloat(e.target.value);

                if (!isNaN(inputValue) && inputValue >= 0) {
                  setSportsTime(inputValue);
                }
              }}
            />
          </label>
          <p className={s.dailyNormaModalFormaRequired}>
            The required amount of water in liters per day:
            <span className={s.dailyNormaModalFormaSpan}>
              {" "}
              {waterNormaUser}L
            </span>
          </p>
        </div>
        <label className={s.dailyNormaModalFormaWriteLable}>
          Write down how much water you will drink:
          <input
            className={`${s.dailyNormaModalFormaInput} ${
              errors.dailyNorma ? s.dailyNormaModalFormaInputError : ""
            }`}
            type="number"
            step="0.1"
            // min="1"
            placeholder="0"
            name="dailyNorma"
            autoComplete="off"
            {...register("dailyNorma")}
          />
          <p className={s.errorMessage}>{errors.dailyNorma?.message}</p>
        </label>
        <button className={s.dailyNormaModalFormaButton} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default DailyNormaModal;
