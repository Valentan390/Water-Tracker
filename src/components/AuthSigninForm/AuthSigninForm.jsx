import s from "./AuthSigninForm.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/authUser/operations";
import { schemaSignin } from "../../helpers/validation.js";
import AuthInput from "../AuthSignupForm/AuthInput/AuthInput.jsx";
import { signinInputs } from "./AuthSigninFormData.js";
import { toast } from "react-toastify";

const AuthSigninForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaSignin),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await dispatch(logInUser(data));
      reset();
      toast.success("Logonization was successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={s.signinPageWraper}>
      <form className={s.signinPageForm} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={s.signinPageTitle}>Sign In</h4>
        {signinInputs.map((input, index) => (
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
          Sign In
        </button>
        <Link className={s.signinPageLink} to={"/signup"}>
          Sign up
        </Link>
      </form>

      <div className={s.signinPageBottle}></div>
    </div>
  );
};

export default AuthSigninForm;
