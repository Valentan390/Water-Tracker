import sprite from "../../images/svg/sprite.svg";

const HeaderLogo = () => {
  return (
    <div>
      <svg width="40" height="48">
        <use href={`${sprite}#icon-calendar-days`} />
      </svg>
      <span>
        TRACKER
        <br />
        OF WATER
      </span>
    </div>
  );
};

export default HeaderLogo;
