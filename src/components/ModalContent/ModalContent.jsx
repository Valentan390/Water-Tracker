import { useModal } from "../../hooks/userModal";
import DailyNormaModal from "../Modal/DailyNormaModal/DailyNormaModal";
import DeleteEntry from "../Modal/DeleteEntry/DeleteEntry";
import SettingModal from "../Modal/SettingModal/SettingModal";
import TodayListModal from "../Modal/TodayListModal/TodayListModal";
import UserLogoModal from "../Modal/UserLogoModal/UserLogoModal";
import UserLogoutModal from "../Modal/UserLogoutModal/UserLogoutModal";

const ModalContent = () => {
  const { modalContent } = useModal();

  switch (modalContent) {
    case "UserLogoModal":
      return <UserLogoModal />;
    case "UserSettings":
      return <SettingModal />;
    case "LogOut":
      return <UserLogoutModal />;
    case "DailyNormaModal":
      return <DailyNormaModal />;
    case "TodayListModal":
      return <TodayListModal />;
    case "DeleteEntry":
      return <DeleteEntry />;
    default:
      return null;
  }
};

export default ModalContent;
