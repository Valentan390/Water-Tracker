import s from "./HomePage.module.css";

import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";

const HomePage = () => {
  return (
    <main>
      <section className={s.sectionHomePage}>
        <div className="container">
          <DailyNorma />
          <WaterRatioPanel />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
