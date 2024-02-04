import s from "./DailyNorma.module.css";
import { useAuth } from "../../hooks/userAuth";
import { useDispatch } from "react-redux";
import { setModalContent, setModalStatus } from "../../redux/modal/modalSlice";
import { useModal } from "../../hooks/userModal";

const DailyNorma = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { modalStatus } = useModal();
  const dailyNormaLiters = user.dailyNorma / 1000;

  const handleOpenUserModal = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("DailyNormaModal"));
  };
  return (
    <div className={s.myDailyNormaWrapper}>
      <h4 className={s.myDailyNormaTitle}>My daily norma</h4>
      <div className={s.myDailyNormaContainer}>
        <p className={s.myDailyNorma}>{dailyNormaLiters}L</p>
        <button
          className={s.myDailyNormaEditButton}
          type="button"
          onClick={handleOpenUserModal}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default DailyNorma;
