import s from "./ForgotPasswordPage.module.css";

import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <main>
      <section className={s.sectionForgotPasswordPage}>
        <div className="container">
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
