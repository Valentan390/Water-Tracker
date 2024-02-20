import s from "./TodayListModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { formatDate } from "../../../helpers/functions";
import { addWaterUser, editWater } from "../../../redux/waterUser/operations";
import { useWaters } from "../../../hooks/userWaters";
import { motion, AnimatePresence } from "framer-motion";
import CloseModal from "../../Button/CloseModal/CloseModal";
import { editAndAddWaterSchema } from "../../../helpers/validation.js";
import useCloseModal from "../../../hooks/useCloseModal.js";
import { containerVariants } from "../../ModalContainer/ModalContainer.jsx";
import LastWaterInfo from "./LastWaterInfo/LastWaterInfo.jsx";
import WaterAmountPicker from "./WaterAmountPicker/WaterAmountPicker.jsx";
import WaterForm from "./WaterForm/WaterForm.jsx";
import TimePickerContainer from "./TimePickerContainer/TimePickerContainer.jsx";
import { toast } from "react-toastify";

const TodayListModal = ({ action }) => {
  const { todayWater, idForEditDeleteWater } = useWaters();
  const handleCloseModal = useCloseModal();

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
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(editAndAddWaterSchema),
  });

  const handlePlusWater = () => {
    setamoutWater(amountWater + 50);
  };
  const handleMinusWater = () => {
    setamoutWater(amountWater - 50);
  };

  const onSubmit = async (data) => {
    try {
      if (action === "edit" && idForEditDeleteWater) {
        await dispatch(editWater({ id: idForEditDeleteWater, ...data }));
        await handleCloseModal();
        reset();
      } else {
        await dispatch(addWaterUser(data));
        await handleCloseModal();
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("waterVolume", amountWater);
    setValue("date", formatDate(data));
  }, [amountWater, setValue, data]);

  const savewaterVolume = watch("waterVolume", "");

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={s.todayListModalWrapper}>
          <CloseModal
            title={
              action === "edit"
                ? "Edit the entered amount of water"
                : "Add Water"
            }
          />

          {todayWater.userWaterDay && todayWater.userWaterDay.length > 0 ? (
            <LastWaterInfo
              lastWater={lastWater}
              lastWaterTime={lastWaterTime}
            />
          ) : (
            <p className={s.amountWaterNotes}>No notes yet</p>
          )}

          <WaterAmountPicker
            title={
              action === "edit" ? "Correct entered data:" : "Choose a Value:"
            }
            amountWater={amountWater}
            handleMinusWater={handleMinusWater}
            handlePlusWater={handlePlusWater}
          />

          <TimePickerContainer setData={setData} data={data} />

          <WaterForm
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            register={register}
            savewaterVolume={savewaterVolume}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodayListModal;
