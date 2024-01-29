import s from "./SignupPage.module.css";
import AuthSignupForm from "../../components/AuthSignupForm/AuthSignupForm";

const SignupPage = () => {
  return (
    <main>
      <section className={s.sectionSignupPage}>
        <div className="container">
          <AuthSignupForm />
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
