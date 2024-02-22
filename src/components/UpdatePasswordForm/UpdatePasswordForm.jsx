import { Link } from "react-router-dom";
import s from "../AuthSigninForm/AuthSigninForm.module.css";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shemaUpdatePassword } from "../../helpers/validation";
import AuthInput from "../AuthSignupForm/AuthInput/AuthInput";

const UpdatePasswordForm = () => {
  //   const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(shemaUpdatePassword),
  });

  const onSubmit = async ({ newPassword }, e) => {
    e.preventDefault();
    console.log({ newPassword: newPassword });
    // try {
    //   await dispatch(logInUser(data));
    //   reset();
    //   toast.success("Logonization was successful");
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  const updatePasswordInputs = [
    {
      label: "Enter your password",
      name: "newPassword",
      placeholder: "Password",
    },
    {
      label: "Repeat password",
      name: "repeatPassword",
      placeholder: "Repeat Password",
    },
  ];

  return (
    <div className={s.signinPageWraper}>
      <form className={s.signinPageForm} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={s.signinPageTitle}>Update password</h4>
        {updatePasswordInputs.map((input, index) => (
          <AuthInput
            key={index}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            register={register}
            errors={errors}
          />
        ))}

        <button className={s.signinPageButton} type="submit">
          Update password
        </button>

        <Link className={s.signinPageLink} to={"/signin"}>
          Sign In
        </Link>
      </form>

      <div className={s.signinPageBottle}></div>
    </div>
  );
};

export default UpdatePasswordForm;
