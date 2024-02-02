import s from "./YourPhotoUser.module.css";

import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/userAuth";
import { toast } from "react-toastify";
import { updateAvatarUser } from "../../redux/authUser/operations";
import sprite from "../../images/svg/sprite.svg";

const YourPhotoUser = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleFileChenge = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.warning(
        "The photo must be less than 5 MB! Please choose another one"
      );
      e.target.value = "";
    } else {
      if (!/^image\/(jpeg|jpg|png)$/.test(selectedFile.type)) {
        toast.warning(
          "Invalid file type. Please choose a valid image file (jpeg, jpg, png)."
        );
        e.target.value = "";
      } else {
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        dispatch(updateAvatarUser(formData));
      }
    }
  };

  return (
    <div className={s.yuorPfotoUserWrapper}>
      <p className={s.settingModalYourphoto}>Your photo</p>
      <div className={s.settingModalDivUploadPhoto}>
        <img className={s.settingModalImg} src={user.avatarURL} alt="" />
        <label className={s.customFileInput}>
          <svg className={s.settingModalSvgArrowUpTray}>
            <use href={`${sprite}#icon-arrow-up-tray`} />
          </svg>
          Upload a photo
          <input
            className={s.settingModalPhotoInput}
            type="file"
            accept="image/,.jpeg,.jpg,.png"
            name="photo"
            onChange={handleFileChenge}
          />
        </label>
      </div>
    </div>
  );
};

export default YourPhotoUser;
