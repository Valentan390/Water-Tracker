import s from "./SettingModal.module.css";
import { useAuth } from "../../../hooks/userAuth";
import sprite from "../../../images/svg/sprite.svg";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import YourPhotoUser from "../../YourPhotoUser/YourPhotoUser";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/modal/modalSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updateUserSchema } from "../../../helpers/validation.js";
import { updateInfoUser } from "../../../redux/authUser/operations.js";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "../../ModalContainer/ModalContainer.jsx";

const SettingModal = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

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

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={s.settingModalWrapper}>
            <div className={s.settingModalSetting}>
              <h4 className={s.settingModalTitle}>Setting</h4>
              <button onClick={handleCloseModal} type="button">
                <svg className={s.settingModalSvgOutline}>
                  <use href={`${sprite}#icon-outline`} />
                </svg>
              </button>
            </div>
            <YourPhotoUser />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.settingModalForm}>
                <div className={s.settingModalYourGenderСontainer}>
                  <div className={s.settingModalYourGenderWrapper}>
                    <h4 className={s.settingModalYourGenderTitle}>
                      Your gender identity
                    </h4>
                    <div className={s.settingModalYourGenderInputWrapper}>
                      <label
                        className={s.settingModalYourGenderLabel}
                        htmlFor=""
                      >
                        <Controller
                          control={control}
                          name="gender"
                          render={({ field }) => (
                            <input
                              type="radio"
                              {...field}
                              value="woman"
                              checked={field.value === "woman"}
                              className={s.radioInput}
                            />
                          )}
                        />
                        Woman
                      </label>
                      <label
                        className={s.settingModalYourGenderLabel}
                        htmlFor=""
                      >
                        <Controller
                          control={control}
                          name="gender"
                          render={({ field }) => (
                            <input
                              type="radio"
                              {...field}
                              value="man"
                              checked={field.value === "man"}
                              className={s.radioInput}
                            />
                          )}
                        />
                        Man
                      </label>
                    </div>
                  </div>

                  <div className={s.settingModalUserInfoWrapper}>
                    <label className={s.settingModalUserInfoLabel} htmlFor="">
                      Your name
                      <input
                        className={`${s.settingModalUserInfoInput} ${
                          errors.username
                            ? s.settingModalUserInfoInputError
                            : ""
                        }`}
                        type="text"
                        placeholder="Your name"
                        {...register("username")}
                      />
                      <p className={s.errorMessage}>
                        {errors.username?.message}
                      </p>
                    </label>

                    <label className={s.settingModalUserInfoLabel} htmlFor="">
                      E-mail
                      <input
                        className={`${s.settingModalUserInfoInput} ${
                          errors.email ? s.settingModalUserInfoInputError : ""
                        }`}
                        type="email"
                        placeholder="email"
                        {...register("email")}
                      />
                      <p className={s.errorMessage}>{errors.email?.message}</p>
                    </label>
                  </div>
                </div>

                <div className={s.settingModalUserPasswordWrapper}>
                  <h4 className={s.settingModalUserPasswordTitle}>Password</h4>
                  <label className={s.settingModalUserInfoLabel} htmlFor="">
                    Outdated password:
                    <input
                      className={`${s.settingModalUserInfoInput} ${
                        errors.oldPassword
                          ? s.settingModalUserInfoInputError
                          : ""
                      }`}
                      type={passwordVisible.oldPassword ? "text" : "password"}
                      placeholder="psssword"
                      name="oldPassword"
                      {...register("oldPassword")}
                    />
                    <p className={s.errorMessage}>
                      {errors.oldPassword?.message}
                    </p>
                    <button
                      className={s.signupPageInputButton}
                      type="button"
                      onClick={() => togglePasswordVisibility("oldPassword")}
                    >
                      <svg className={s.signupPageInputButtonSvg}>
                        <use
                          href={`${sprite}#icon-${
                            passwordVisible.oldPassword ? "eye" : "eye-slash"
                          }`}
                        />
                      </svg>
                    </button>
                  </label>

                  <label className={s.settingModalUserInfoLabel} htmlFor="">
                    New Password:
                    <input
                      className={`${s.settingModalUserInfoInput} ${
                        errors.newPassword
                          ? s.settingModalUserInfoInputError
                          : ""
                      } ${
                        errors.newPassword
                          ? s.settingModalUserInfoInputError
                          : ""
                      }`}
                      type={passwordVisible.newPassword ? "text" : "password"}
                      placeholder="psssword"
                      name="newPassword"
                      {...register("newPassword")}
                    />
                    <p className={s.errorMessage}>
                      {errors.newPassword?.message}
                    </p>
                    <button
                      className={s.signupPageInputButton}
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    >
                      <svg className={s.signupPageInputButtonSvg}>
                        <use
                          href={`${sprite}#icon-${
                            passwordVisible.newPassword ? "eye" : "eye-slash"
                          }`}
                        />
                      </svg>
                    </button>
                  </label>

                  <label className={s.settingModalUserInfoLabel} htmlFor="">
                    Repeat new password:
                    <input
                      className={`${s.settingModalUserInfoInput} ${
                        errors.repeatPassword
                          ? s.settingModalUserInfoInputError
                          : ""
                      } ${
                        errors.repeatPassword
                          ? s.settingModalUserInfoInputError
                          : ""
                      }`}
                      type={
                        passwordVisible.repeatPassword ? "text" : "password"
                      }
                      placeholder="psssword"
                      name="repeatPassword"
                      {...register("repeatPassword")}
                    />
                    <p className={s.errorMessage}>
                      {errors.repeatPassword?.message}
                    </p>{" "}
                    <button
                      className={s.signupPageInputButton}
                      type="button"
                      onClick={() => togglePasswordVisibility("repeatPassword")}
                    >
                      <svg className={s.signupPageInputButtonSvg}>
                        <use
                          href={`${sprite}#icon-${
                            passwordVisible.repeatPassword ? "eye" : "eye-slash"
                          }`}
                        />
                      </svg>
                    </button>
                  </label>
                </div>
              </div>
              <button className={s.settingModalButtonSave} type="submit">
                Save
              </button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SettingModal;
