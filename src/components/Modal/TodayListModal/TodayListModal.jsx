import s from "./TodayListModal.module.css";
import sprite from "../../../images/svg/sprite.svg";
import { useEffect, useState } from "react";
import TimePicker from "./components/TimePicker";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { formatDate } from "../../../helpers/functions";
import { addWaterUser } from "../../../redux/waterUser/operations";

const TodayListModal = () => {
  const lastAddition = true;
  const lastWater = 250;
  const lastWaterTime = "7:00 AM";
  const [amountWater, setamoutWater] = useState(lastWater);
  const [data, setData] = useState(dayjs());
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // reset,
    // formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(updateDailyNormaUsrSchema),
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
    console.log(data);
    dispatch(addWaterUser(data));
  };

  useEffect(() => {
    setValue("waterVolume", amountWater);
    setValue("date", formatDate(data));
  }, [amountWater, setValue, data]);

  return (
    <div className={s.todayListModalWrapper}>
      <div className={s.todayListModalContainerEdit}>
        <h4 className={s.todayListModalEdit}>
          Edit the entered amount of water
        </h4>
        <button type="button" onClick={handleCloseModal}>
          <svg className={s.todayListModalEditSvg}>
            <use href={`${sprite}#icon-outline`} />
          </svg>
        </button>
      </div>

      {lastAddition ? (
        <div className={s.lastWaterContainer}>
          <svg className={s.lastWaterSvg}>
            <use href={`${sprite}#icon-Frame-1`} />
          </svg>
          <p className={s.lastWater}>{lastWater}ml</p>
          <p className={s.lastWaterTime}>{lastWaterTime}</p>
        </div>
      ) : (
        <p>No notes yet</p>
      )}

      <div>
        <p className={s.amountWaterTitle}>Correct entered data:</p>
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
            className={s.valueWaterImput}
            type="number"
            // value={amountWater}
            name="waterVolume"
            {...register("waterVolume")}
          />
        </label>

        <div className={s.valueWaterSubmit}>
          <p className={s.valueWaterSubmitInfo}>{amountWater}ml</p>
          <button className={s.valueWaterSubmitButton} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodayListModal;
