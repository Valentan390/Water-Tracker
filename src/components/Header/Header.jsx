import s from "./Header.module.css";

import HeaderLogo from "../HeaderLogo/HeaderLogo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

const Header = () => {
  const isLoggedIn = true;
  return (
    <header className={s.headerSection}>
      <div className={`${s.headerWraper} container`}>
        <HeaderLogo />
        {isLoggedIn ? <UserAuth /> : <UserLogoModal />}
      </div>
    </header>
  );
};

export default Header;
