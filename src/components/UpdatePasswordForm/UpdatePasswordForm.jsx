import { Link, useNavigate, useSearchParams } from "react-router-dom";
import s from "../AuthSigninForm/AuthSigninForm.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shemaUpdatePassword } from "../../helpers/validation";
import AuthInput from "../AuthSignupForm/AuthInput/AuthInput";
import { updatePasswordInputs } from "./UpdatePasswordFormData.js";
import { updatePassworUser } from "../../redux/authUser/operations";
import { toast } from "react-toastify";

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const resetToken = searchParams[0].get("resetToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(shemaUpdatePassword),
  });

  const onSubmit = async ({ newPassword }) => {
    try {
      const response = await dispatch(
        updatePassworUser({ newPassword, resetToken })
      );
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/signin");
      }
      reset();
    } catch (error) {
      toast.error("Error updating password:", error.message);
    }
  };

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
