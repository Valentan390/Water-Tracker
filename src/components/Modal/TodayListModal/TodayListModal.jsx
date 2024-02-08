import s from "./TodayListModal.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useEffect, useState } from "react";
import TimePicker from "./components/TimePicker";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { formatDate } from "../../../helpers/functions";
import { addWaterUser, editWater } from "../../../redux/waterUser/operations";
import { useWaters } from "../../../hooks/userWaters";
import moment from "moment";
import CloseModal from "../../Button/CloseModal/CloseModal";
import { editAndAddWaterSchema } from "../../../helpers/validation.js";

const TodayListModal = ({ action }) => {
  const { todayWater, idForEditDeleteWater } = useWaters();

  const lastWater =
    action === "edit"
      ? todayWater.userWaterDay?.find(
          (item) => item._id === idForEditDeleteWater
        ).waterVolume
      : todayWater.userWaterDay?.[0]?.waterVolume;

  const lastWaterTime =
    action === "edit"
      ? todayWater.userWaterDay?.find(
          (item) => item._id === idForEditDeleteWater
        )?.date
      : todayWater.userWaterDay?.[0]?.date;

  const [amountWater, setamoutWater] = useState(
    todayWater.userWaterDay && todayWater.userWaterDay.length > 0
      ? lastWater
      : 0
  );

  const [data, setData] = useState(
    action === "edit" ? dayjs(lastWaterTime).subtract(2, "hour") : dayjs()
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(editAndAddWaterSchema),
  });

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

  const handlePlusWater = () => {
    setamoutWater(amountWater + 50);
  };
  const handleMinusWater = () => {
    setamoutWater(amountWater - 50);
  };

  const onSubmit = (data) => {
    if (action === "edit" && idForEditDeleteWater) {
      dispatch(editWater({ id: idForEditDeleteWater, ...data }));
      handleCloseModal();
    } else {
      dispatch(addWaterUser(data));
      handleCloseModal();
    }
  };

  useEffect(() => {
    setValue("waterVolume", amountWater);
    setValue("date", formatDate(data));
  }, [amountWater, setValue, data]);

  const savewaterVolume = watch("waterVolume", "");
  return (
    <div className={s.todayListModalWrapper}>
      <CloseModal
        title={
          action === "edit" ? "Edit the entered amount of water" : "Add Water"
        }
      />
      {todayWater.userWaterDay && todayWater.userWaterDay.length > 0 ? (
        <div className={s.lastWaterContainer}>
          <svg className={s.lastWaterSvg}>
            <use href={`${sprite}#icon-Frame-1`} />
          </svg>
          <p className={s.lastWater}>{lastWater}ml</p>
          <p className={s.lastWaterTime}>
            {moment(lastWaterTime).utc().format("HH:mm")}
          </p>
        </div>
      ) : (
        <p className={s.amountWaterNotes}>No notes yet</p>
      )}

      <div>
        <p className={s.amountWaterTitle}>
          {action === "edit" ? "Correct entered data:" : "Choose a Value"}
        </p>
        <p className={s.amountWater}>Amount of water:</p>
        <div className={s.amountWaterCantainer}>
          <button
            className={s.amountWaterButton}
            type="button"
            onClick={handleMinusWater}
          >
            <svg className={s.amountWaterSvg}>
              <use href={`${sprite}#icon-minus-small`} />
            </svg>
          </button>
          <p className={s.water}>{amountWater}ml</p>
          <button
            className={s.amountWaterButton}
            type="button"
            onClick={handlePlusWater}
          >
            <svg className={s.amountWaterSvgPlus}>
              <use href={`${sprite}#icon-plus-small`} />
            </svg>
          </button>
        </div>
      </div>

      <div className={s.timePickerCanteiner}>
        <p className={s.recordingTime}>Recording time:</p>
        <TimePicker setData={setData} data={data} />
      </div>

      <form className={s.valueWaterForm} onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default TodayListModal;
