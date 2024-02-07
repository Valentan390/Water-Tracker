import s from "./TodayWaterList.module.css";
import sprite from "../../images/svg/sprite.svg";
import moment from "moment";

import { useWaters } from "../../hooks/userWaters";
import EditWater from "../Button/EditWater/EditWater";
import DeleteWater from "../Button/DeleteWater/DeleteWater";
import AddWater from "../Button/AddWater/AddWater";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userWaterDay } from "../../redux/waterUser/operations";
import { setModalContent, setModalStatus } from "../../redux/modal/modalSlice";
import { useModal } from "../../hooks/userModal";
import { FragmentLoader } from "../Loader/Loader";

const TodayWaterList = () => {
  const { todayWater, loading } = useWaters();
  const { modalStatus } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userWaterDay());
  }, [dispatch]);

  const handleOpenUserModal = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("TodayListModal"));
  };

  return (
    <div>
      <h4 className={s.todayWaterListTitle}>Today</h4>
      <ul className={s.todayWaterList}>
        {loading ? (
          <li className={s.loaderContainer}>
            <FragmentLoader />
          </li>
        ) : todayWater.userWaterDay?.length > 0 ? (
          todayWater.userWaterDay.map(({ _id, date, waterVolume }) => (
            <li className={s.todayWateritem} key={_id}>
              <div className={s.todayWaterVolumeWrapper}>
                <svg className={s.todayWaterVolumeSvg}>
                  <use href={`${sprite}#icon-Frame-1`} />
                </svg>
                <p className={s.todayWaterVolum}>{waterVolume} ml</p>
                <p className={s.todayWaterVolumTime}>
                  {moment(date).utcOffset(0).format("HH:mm")}
                </p>
              </div>
              <div className={s.todayWaterCantainerEditDelete}>
                <EditWater id={_id} />
                <DeleteWater id={_id} />
              </div>
            </li>
          ))
        ) : (
          <li className={s.noRecords}>
            There are no entries for notes, please add a note...
          </li>
        )}
      </ul>
      <AddWater onClick={handleOpenUserModal} />
    </div>
  );
};

export default TodayWaterList;
