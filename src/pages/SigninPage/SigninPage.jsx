import s from "./SigninPage.module.css";

import AuthSigninForm from "../../components/AuthSigninForm/AuthSigninForm";

const SigninPage = () => {
  return (
    <main>
      <section className={s.sectionSigninPage}>
        <div className="container">
          <AuthSigninForm />
        </div>
      </section>
    </main>
  );
};

export default SigninPage;
