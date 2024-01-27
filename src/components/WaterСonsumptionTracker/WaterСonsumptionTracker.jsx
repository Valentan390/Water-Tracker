import s from "./WaterСonsumptionTracker.module.css";
import WaterСonsumptionTrackerData from "./WaterСonsumptionTrackerData.js";

const WaterСonsumptionTracker = () => {
  return (
    <div className={s.waterСonsumptionTrackerWraper}>
      <h1 className={s.waterСonsumptionTrackerMainHeading}>
        Water consumption tracker
      </h1>
      <h2 className={s.waterСonsumptionTrackerRecord}>
        Record daily water intake and track
      </h2>
      <h3 className={s.waterСonsumptionTrackerTracer}>Tracker Benefits</h3>
      <ul className={s.waterСonsumptionTrackerList}>
        {WaterСonsumptionTrackerData.map((item, index) => (
          <li className={s.waterСonsumptionTrackerItems} key={index}>
            <svg className={s.waterСonsumptionTrackerSvg}>
              <use href={item.icon} />
            </svg>
            <p className={s.waterСonsumptionTrackerItemsText}>{item.text}</p>
          </li>
        ))}
      </ul>
      <button className={s.waterСonsumptionTrackerButton}>Try tracker</button>
    </div>
  );
};

export default WaterСonsumptionTracker;
