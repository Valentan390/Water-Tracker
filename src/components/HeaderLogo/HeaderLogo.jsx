// import { NavLink } from "react-router-dom";
import sprite from "../../images/svg/sprite.svg";
import s from "./HeaderLogo.module.css";

const HeaderLogo = () => {
  return (
    <div className={s.logoWraper}>
      <svg width="40" height="40">
        <use href={`${sprite}#icon-Logo`} />
      </svg>
      <p className={s.logoTekst}>
        TRACKER
        <br />
        OF WATER
      </p>
    </div>
  );
};

export default HeaderLogo;
