import s from "./WaterRatioPanel.module.css";
import sprite from "../../images/svg/sprite.svg";

import DiscreteSliderLabel from "./Slider";
import { setModalContent, setModalStatus } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/userModal";

const WaterRatioPanel = () => {
  const dispatch = useDispatch();
  const { modalStatus } = useModal();

  const handleOpenUserModal = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("TodayListModal"));
  };

  return (
    <div className={s.waterRatioPanelWrapper}>
      <div className={s.waterRatioPanelContainer}>
        <p className={s.waterRatioPanelTitel}>Today</p>
        <DiscreteSliderLabel />
      </div>
      <button
        className={s.waterRatioPanelButton}
        type="button"
        onClick={handleOpenUserModal}
      >
        <svg className={s.waterRatioPanelSvg}>
          <use href={`${sprite}#icon-plus-circle`} />
        </svg>
        Add Water
      </button>
    </div>
  );
};

export default WaterRatioPanel;
