import * as yup from "yup";

const emailRegexp = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const updateUserSchema = yup.object().shape({
  gender: yup.string().oneOf(["woman", "man"]),
  photo: yup.string(),
  username: yup
    .string()
    .min(3, "Minimum 3 characters")
    .max(64, "Maximum 64 characters")
    .transform((value) => (value === "" ? undefined : value)),
  email: yup
    .string()
    .matches(emailRegexp, "Enter a correct email")
    .transform((value) => (value === "" ? undefined : value)),
  oldPassword: yup
    .string()
    .min(8, "Minimum 8 characters")
    .max(64, "Maximum 64 characters")
    .transform((value) => (value === "" ? undefined : value))
    .when("newPassword", (newPassword, field) =>
      newPassword[0]
        ? field.required("Old password is required to fill")
        : field
    ),
  newPassword: yup
    .string()
    .min(8, "Minimum 8 characters")
    .max(64, "Maximum 64 characters")
    .transform((value) => (value === "" ? undefined : value))
    .test(
      "notEqual",
      "New password must not match old password",
      function (value) {
        const oldPassword = this.parent.oldPassword;
        return value !== oldPassword || oldPassword === undefined;
      }
    ),
  repeatPassword: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .test(
      "notEqual",
      "Repeat password must match New password",
      function (value) {
        const newPassword = this.parent.newPassword;
        return value === newPassword || newPassword === undefined;
      }
    ),
});

export const updateDailyNormaUsrSchema = yup.object().shape({
  dailyNorma: yup
    .number()
    .typeError("Field must be a number")
    .positive("Must be a positive number")
    .min(1, "Minimum 1L")
    .max(15, "Maximum 15L")
    .required("Field is required"),
});

export const calculateWaterNorma = (gender, weight, sportsTime) => {
  const coefficientWoman = 0.03;
  const coefficientMan = 0.04;
  const coefficientSportsTimeWoman = 0.4;
  const coefficientSportsTimeMan = 0.6;

  if (!weight) return;

  return gender === "woman"
    ? (
        weight * coefficientWoman +
        sportsTime * coefficientSportsTimeWoman
      ).toFixed(1)
    : gender === "man"
    ? (weight * coefficientMan + sportsTime * coefficientSportsTimeMan).toFixed(
        1
      )
    : undefined;
};
