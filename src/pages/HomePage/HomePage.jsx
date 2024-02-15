import s from "./HomePage.module.css";

import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

const HomePage = () => {
  return (
    <main>
      <section className={s.sectionHomePage}>
        <div className={`${s.sectionHomePageWrapper} container`}>
          <div className={s.sectionHomePageDaily}>
            <DailyNorma />
            <div className={s.sectionHomePageBottle}></div>
            <WaterRatioPanel />
          </div>
          <div className={s.sectionHomePageToday}>
            <TodayWaterList />
            <MonthStatsTable />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
