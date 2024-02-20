import s from "./DailyNormaModal.module.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/userAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  calculateWaterNorma,
  updateDailyNormaUsrSchema,
} from "../../../helpers/validation";
import { updatDailiNormaUser } from "../../../redux/authUser/operations";
import CloseModal from "../../Button/CloseModal/CloseModal";
import { toast } from "react-toastify";
import DailyNormaModalGenderInput from "./DailyNormaModalGenderInput/DailyNormaModalGenderInput";
import NumericInput from "./NumericInput/NumericInput";
import useCloseModal from "../../../hooks/useCloseModal";

const DailyNormaModal = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const handleCloseModal = useCloseModal();
  const [waterNormaUser, setWaterNormaUser] = useState("");
  const [weight, setWeight] = useState("");
  const [sportsTime, setSportsTime] = useState("");
  const [gender, setGender] = useState(user?.gender || "");

  const numericInputs = [
    {
      label: "Your weight in kilograms",
      value: weight,
      setValue: setWeight,
      min: "1",
      placeholder: "0",
    },
    {
      label:
        "The time of active participation in sports or other activities with a high physical load in hours",
      value: sportsTime,
      setValue: setSportsTime,
      min: "0",
      placeholder: "0",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(updateDailyNormaUsrSchema),
  });

  const onSubmit = async ({ dailyNorma }) => {
    try {
      await handleCloseModal();
      await dispatch(updatDailiNormaUser({ dailyNorma: dailyNorma * 1000 }));
      reset();
    } catch (error) {
      toast.error(error.message);
    }
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
      <CloseModal title={"My daily norma"} />

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
          <DailyNormaModalGenderInput gender={gender} setGender={setGender} />

          {numericInputs.map((numericInput, index) => (
            <NumericInput key={index} {...numericInput} />
          ))}

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
