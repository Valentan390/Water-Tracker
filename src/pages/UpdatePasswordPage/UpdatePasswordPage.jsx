import UpdatePasswordForm from "../../components/UpdatePasswordForm/UpdatePasswordForm.jsx";
import s from "./UpdatePasswordPage.module.css";

const UpdatePasswordPage = () => {
  return (
    <main>
      <section className={s.sectionUpdatePasswordPage}>
        <div className="container">
          <UpdatePasswordForm />
        </div>
      </section>
    </main>
  );
};

export default UpdatePasswordPage;
