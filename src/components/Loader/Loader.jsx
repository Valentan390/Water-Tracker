import { Hourglass, TailSpin } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderHourglass}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["var(--dark-blue)", "var(--light-blue-3)"]}
      />
    </div>
  );
};

export const FragmentLoader = () => {
  return (
    <>
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="var(--light-blue-3)"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        zIndex="3"
      />
    </>
  );
};

export default Loader;
