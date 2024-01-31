import s from "./Header.module.css";

import HeaderLogo from "../HeaderLogo/HeaderLogo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { useAuth } from "../../hooks/userAuth";

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header className={s.headerSection}>
      <div className={`${s.headerWraper}`}>
        <HeaderLogo />
        {!isLoggedIn ? <UserAuth /> : <UserLogo />}
      </div>
    </header>
  );
};

export default Header;
