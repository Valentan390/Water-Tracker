import s from "./WhyDrinkWater.module.css";
import WhyDrinkWaterData from "./WhyDrinkWaterData.js";

const WhyDrinkWater = () => {
  return (
    <div className={s.whyDrinkWaterWraper}>
      <h2 className={s.whyDrinkWaterTitle}>Why drink water</h2>
      <ul className={s.whyDrinkWaterList}>
        {WhyDrinkWaterData.map((reason, index) => (
          <li className={s.whyDrinkWaterItems} key={index}>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
