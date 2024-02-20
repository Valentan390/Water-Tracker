import s from "./SettingModal.module.css";
import { useAuth } from "../../../hooks/userAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import YourPhotoUser from "../../YourPhotoUser/YourPhotoUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "../../../helpers/validation.js";
import { updateInfoUser } from "../../../redux/authUser/operations.js";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "../../ModalContainer/ModalContainer.jsx";
import CloseModal from "../../Button/CloseModal/CloseModal.jsx";
import TextInput from "./TextInput/TextInput.jsx";
import PasswordInput from "./PasswordInput/PasswordInput.jsx";
import { inputPassword, users } from "./SettingModalDate/SettingModalDate.js";
import GenderInput from "./GenderInput/GenderInput.jsx";
import useCloseModal from "../../../hooks/useCloseModal.js";

const SettingModal = () => {
  const { user } = useAuth();
  const handleCloseModal = useCloseModal();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: user?.gender || "",
      username: user?.username || "",
      email: user?.email || "",
    },
    mode: "onSubmit",
    resolver: yupResolver(updateUserSchema),
  });

  const onSubmit = async ({ repeatPassword, ...formData }) => {
    try {
      await dispatch(updateInfoUser(formData)).unwrap();
      await handleCloseModal();
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={s.settingModalWrapper}>
          <CloseModal title={"Setting"} />
          <YourPhotoUser />
          <form
            className={s.settingModalForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={s.settingModalYourGenderСontainer}>
              <GenderInput control={control} />
              {users.map((user) => (
                <TextInput
                  key={user}
                  label={user === "username" ? "Your name" : "E-mail"}
                  name={user}
                  errors={errors}
                  register={register}
                />
              ))}
            </div>

            <div className={s.settingModalUserPasswordWrapper}>
              <h4 className={s.settingModalUserPasswordTitle}>Password</h4>
              {inputPassword.map(({ label, name }) => (
                <PasswordInput
                  key={label}
                  label={`${label} password`}
                  name={name}
                  errors={errors}
                  register={register}
                />
              ))}
            </div>
            <button className={s.settingModalButtonSave} type="submit">
              Save
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingModal;
