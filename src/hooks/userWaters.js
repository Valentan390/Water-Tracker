import { useSelector } from "react-redux";
import {
  selectLoading,
  selectMonthWater,
  selectTodayWater,
  selectTodayWaterID,
} from "../redux/waterUser/selectors";

export const useWaters = () => {
  const loading = useSelector(selectLoading);
  const todayWater = useSelector(selectTodayWater);
  const idForEditDeleteWater = useSelector(selectTodayWaterID);
  const monthWater = useSelector(selectMonthWater);
  console.log(monthWater);

  return {
    loading,
    todayWater,
    idForEditDeleteWater,
    monthWater,
  };
};
