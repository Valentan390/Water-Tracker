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

  // .when("newPassword", (newPassword, field) =>
  //   newPassword
  //     ? field
  //         .oneOf([yup.ref("newPassword")], "Passwords do not match")
  //         .transform((value) => (value === "" ? undefined : value))
  //     : field
  // ),
});
