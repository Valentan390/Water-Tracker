import s from "./AuthSignupForm.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logInUser, registerUser } from "../../redux/authUser/operations";
import { schemaSignup } from "../../helpers/validation";
import AuthInput from "./AuthInput/AuthInput.jsx";
import { authInputs } from "./AuthSignupFormData/AuthSignupFormData.js";

const AuthSignupForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaSignup),
  });

  const onSubmit = async ({ username, email, password }, e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      await dispatch(logInUser({ email, password }));
      reset();
      toast.success("Registration completed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={s.signupPageWraper}>
      <h4 className={s.signupPageTitle}>Sign Up</h4>
      <form className={s.signupPageForm} onSubmit={handleSubmit(onSubmit)}>
        {authInputs.map((input, index) => (
          <AuthInput
            key={index}
            label={input.label}
            name={input.name}
            register={register}
            errors={errors}
            placeholder={input.placeholder}
          />
        ))}

        <button
          className={s.signupPageButton}
          name="Registration"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      <Link to={"/signin"} className={s.signupPageLink}>
        Sign in
      </Link>
      <div className={s.signupPageBottle}></div>
    </div>
  );
};

export default AuthSignupForm;
