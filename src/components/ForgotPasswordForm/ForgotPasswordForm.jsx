import { useDispatch } from "react-redux";
import s from "../AuthSigninForm/AuthSigninForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import AuthInput from "../AuthSignupForm/AuthInput/AuthInput";
import { schemaForgotPassword } from "../../helpers/validation.js";
import { forgotPasswordUser } from "../../redux/authUser/operations";
import { forgotPasswordInput } from "./ForgotPasswordForm.js";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaForgotPassword),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      await dispatch(forgotPasswordUser(data));
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={s.signinPageWraper}>
      <form className={s.signinPageForm} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={s.signinPageTitle}>Forgot password</h4>
        {forgotPasswordInput.map((input, index) => (
          <AuthInput
            key={index}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            register={register}
            errors={errors}
          />
        ))}

        <button className={s.signinPageButton} name="Signin" type="submit">
          Send
        </button>
        <Link className={s.signinPageLink} to={"/signin"}>
          Sign In
        </Link>
      </form>

      <div className={s.signinPageBottle}></div>
    </div>
  );
};

export default ForgotPasswordForm;
