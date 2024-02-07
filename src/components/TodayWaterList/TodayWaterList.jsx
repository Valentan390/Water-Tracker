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

  //   const handleDeleteWater = () => {
  //     dispatch(setModalStatus(!modalStatus));
  //     dispatch(setModalContent("DeleteEntry"));
  //     //   dispatch(setIdForEditDelete(id));

  //     console.log("gggggggggggggggggggggggggg");
  //   };

  return loading ? (
    <b>Загружается </b>
  ) : (
    <div>
      <h4 className={s.todayWaterListTitle}>Today</h4>
      <ul className={s.todayWaterList}>
        {todayWater.userWaterDay?.map(({ _id, date, waterVolume }) => (
          <li className={s.todayWateritem} key={_id}>
            <div className={s.todayWaterVolumeWrapper}>
              <svg className={s.todayWaterVolumeSvg}>
                <use href={`${sprite}#icon-Frame-1`} />
              </svg>
              <p className={s.todayWaterVolum}>{waterVolume} ml</p>
              <p className={s.todayWaterVolumTime}>
                {moment(date).format("HH:mm")}
              </p>
            </div>
            <div>
              <EditWater />
              <DeleteWater id={_id} />
            </div>
          </li>
        ))}
      </ul>
      <AddWater onClick={handleOpenUserModal} />
    </div>
  );
};

export default TodayWaterList;
