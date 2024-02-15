import s from "./WaterRatioPanel.module.css";
import sprite from "../../images/svg/sprite.svg";

// import DiscreteSliderLabel from "./Slider/Slider";
import { setModalContent, setModalStatus } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/userModal";
import { useWaters } from "../../hooks/userWaters";
import WaterProgress from "./Slider/Slider";

const WaterRatioPanel = () => {
  const dispatch = useDispatch();
  const { modalStatus } = useModal();
  const { todayWater } = useWaters();
  const percentDailyNorma = todayWater?.percentDailyNormaUser || 0;

  const handleOpenUserModal = () => {
    dispatch(setModalStatus(!modalStatus));
    dispatch(setModalContent("TodayListModal"));
  };

  return (
    <div className={s.waterRatioPanelWrapper}>
      <WaterProgress percentDailyNorma={percentDailyNorma}/>
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
