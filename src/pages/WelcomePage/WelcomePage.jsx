import WaterСonsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import s from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <main>
      <section className={s.sectionWelcomePager}>
        <div className={`${s.welcomePageWraper} container`}>
          <WaterСonsumptionTracker />
          <WhyDrinkWater />
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;
